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
	const onStatusChange = async () => {
		props.onStatusChange();
	};
	///////////////////////////////////////////////////
	return (
		<div>
			<div className={style.inputContainer}>
				<div>
					<NewTransaction changeStatus={onStatusChange} />
				</div>
				<input
					placeholder='Filtro de Transações'
					id='input'
					className={style.input}
					onInput={handleTransactionFilter}></input>
			</div>
			<div>
				<Summary transactions={filter} />
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
										numberFormat,
										yearMonthDay,
										yearMonth,
										type,
									}}
									key={_id}
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
