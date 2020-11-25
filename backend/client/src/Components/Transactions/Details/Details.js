import React, { useState, useEffect } from "react";
import Popup from "../../Popup/Popup";
import style from "./Details.module.css";
import Form from "../../Form/Form.js";
import endPoints from "../../../http/Requests.js";
function Details(props) {
	const {
		category,
		day,
		description,
		value,
		_id,
		numberFormat,
		type,
		yearMonth,
		yearMonthDay,
	} = props.properties;

	const [details, setDetails] = useState({
		category,
		day,
		description,
		value,
		yearMonthDay,
		type,
	});
	const inputs = [
		{
			type: "radio",
			group: "group1",
			id: "despesa",
			label: "Despesa",
			checked: details.type === "-",
		},
		{
			type: "radio",
			group: "group1",
			id: "receita",
			label: "Receita",
			checked: details.type === "+",
		},
		{
			type: "text",
			id: "desc",
			label: "Descrição da transação",
			value: details.description,
		},
		{
			type: "text",
			id: "categ",
			label: "Categoria",
			value: details.category,
		},
		{
			type: "number",
			min: 0,
			id: "val",
			label: "Valor",
			value: details.value,
		},
		{
			type: "date",
			id: "date",
			label: "Data da transação",
			value: details.yearMonthDay,
		},
	];
	/////////////////////////////////////////////////////////////////////////////////////////////////////

	const [status, setStatus] = useState(404);
	const [popup, setPopup] = useState(false);
	const handlePopupChange = () => {
		setPopup(!popup);
	};

	const handleEditTransaction = (event) => {
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
			day: dia,
			type: tipo,
			yearMonthDay: `${ano}-${mes}-${dia}`,

			date: diaMesAno,
		};
		(async () => {
			const res = await endPoints.patchTransaction(_id, newForm);
			setStatus(res.status);
			setDetails(newForm);
		})();
	};

	useEffect(() => {
		setTimeout(() => {
			if (status === 200) {
				setPopup(!popup);
				setStatus(500);
				props.changeStatus(
					(async () => {
						return await endPoints.getTransaction(yearMonth);
					})()
				);
			}

			//
		}, 2000);
	}, [status]);

	return (
		<li className={style.liContainer}>
			<div className={style.allBorder}>
				<div className={` ${style.day}`}>{details.day}</div>
				<div className={`${style.middle}`}>
					<p className={`${style.category}`}> {details.category}</p>
					<p className={`${style.description}`}>{details.description}</p>
				</div>
				<div className={`${style.value}`}>
					{numberFormat.format(details.value)}
				</div>
				<div className={style.editDelete}>
					<button onClick={handlePopupChange}>edit</button>
					<button>delete</button>
				</div>
				{popup ? (
					<Popup
						title={"Editar registro"}
						content={
							<Form
								status={status}
								inputs={inputs}
								submit={handleEditTransaction}
							/>
						}
						onPopupChange={handlePopupChange}
					/>
				) : null}
			</div>
		</li>
	);
}

export default Details;
