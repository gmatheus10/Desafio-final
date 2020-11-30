import React, { useEffect, useState } from "react";
import style from "./NewTransaction.module.css";
import endPoints from "../../../http/Requests.js";
import inputs from "./inputs.json";
import Form from "../../Form/Form.js";
import Popup from "../../Popup/Popup";
function NewTransaction(props) {
	const [popup, setPopup] = useState(false);
	const [status, setStatus] = useState(404);
	const [filter, setFilter] = useState([]);

	useEffect(() => {
		setFilter(props.transactions);
	}, [props.transactions]);
	//////////////////////////////////////////////////////////
	const handlePopupChange = () => {
		setPopup(!popup);
	};
	///////////////////////////////////////////////////////
	const handleNewTransaction = async (event) => {
		event.preventDefault();

		const despesa = event.target[0];
		const receita = event.target[1];
		const desc = event.target[2].value;
		const categ = event.target[3].value;
		const val = event.target[4].value;
		const diaMesAno = event.target[5].value;
		let tipo = "*";
		if (despesa.checked) {
			tipo = "-";
		} else if (receita.checked) {
			tipo = "+";
		}
		const ano = diaMesAno.slice(0, 4);

		const mes = diaMesAno.slice(5, 7);

		const dia = diaMesAno.slice(8);

		const newForm = {
			description: desc,
			value: val,
			category: categ,
			year: ano,
			month: mes,
			day: dia,
			yearMonth: `${ano}-${mes}`,
			yearMonthDay: `${ano}-${mes}-${dia}`,
			type: tipo,
		};

		const res = await endPoints.postTransaction(newForm);
		const newFilter = [...filter];
		const finalForm = { ...newForm, _id: res.data._id };
		newFilter.push(finalForm);
		if (filter.length > 0) {
			newFilter.sort((a, b) => a.yearMonthDay.localeCompare(b.yearMonthDay));

			setFilter(newFilter);
		}
		setStatus(res.status);
	};
	////////////////////////////////////////////////////

	useEffect(() => {
		setTimeout(() => {
			if (status === 200) {
				setPopup(false);
				setStatus(500);
				if (filter.length > 0) {
					props.changeStatus(filter);
				}
				props.newTransaction();
			}
		}, 500);
	}, [status]);
	////////////////////////////////////////////////////////////

	return (
		<div>
			<button onClick={handlePopupChange} className={style.insert}>
				Nova Transação
			</button>
			{popup ? (
				<Popup
					title={"Inserir novo registro"}
					content={
						<Form
							status={status}
							inputs={inputs}
							submit={handleNewTransaction}
						/>
					}
					onPopupChange={handlePopupChange}
				/>
			) : null}
		</div>
	);
}

export default NewTransaction;
