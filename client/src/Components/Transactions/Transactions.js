import React, { useEffect, useState } from "react";
import Details from "./Details/Details";
import { removeDiacritics } from "../../helpers/AccentStrip.js";
import Summary from "./Summary/Summary";
import style from "./Transactions.module.css";
import NewTransaction from "./NewTransaction/NewTransaction";

function Transactions(props) {
	const { transactions, numberFormat } = props;
	const [filter, setFilter] = useState([]);
	///////////////////////////////////////////////////
	useEffect(() => {
		setFilter(transactions);
	}, [transactions]);
	console.log(transactions);
	///////////////////////////////////////////////////
	const handleTransactionFilter = (event) => {
		let filteredTransactions = transactions.filter((el) => {
			return (
				removeDiacritics(el.description)
					.toLowerCase()
					// .indexOf(event.target.value.toLowerCase()) !== -1
					.includes(event.target.value.toLowerCase())
			);
		});
		setFilter(filteredTransactions);
	};
	const onStatusChange = async (newFilter) => {
		setFilter(newFilter);
	};
	///////////////////////////////////////////////////
	return (
		<div>
			<div className={style.inputContainer}>
				<div>
					<NewTransaction
						changeStatus={onStatusChange}
						singlePeriod={props.singlePeriod}
						transactions={filter}
					/>
				</div>
				<input
					placeholder='Filtro de Transações'
					id='input'
					className={style.input}
					onInput={handleTransactionFilter}></input>
			</div>
			<div>
				<Summary transactions={filter} numberFormat={numberFormat} />
			</div>
			<div>
				<ul className={style.ulDetails}>
					{filter.map(
						({
							category,
							day,
							description,
							value,
							_id,
							type,
							yearMonthDay,
							yearMonth,
						}) => {
							return (
								<Details
									changeStatus={onStatusChange}
									properties={{
										category,
										day,
										description,
										value,
										_id,

										yearMonthDay,
										yearMonth,
										type,
									}}
									numberFormat={numberFormat}
									key={_id}
									transactions={filter}
									statusChange={onStatusChange}
								/>
							);
						}
					)}
				</ul>
			</div>
		</div>
	);
}

export default Transactions;
