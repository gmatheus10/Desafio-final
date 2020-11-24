import React, { useEffect, useState } from "react";
import style from "./NewTransaction.module.css";
import endPoints from "../../http/Requests.js";
import inputs from "./inputs.json";
import Form from "../Form/Form.js";
import Popup from "../Popup/Popup";
function NewTransaction() {
	const [popup, setPopup] = useState(false);
	const [status, setStatus] = useState(404);
	//////////////////////////////////////////////////////////
	const handlePopupChange = () => {
		setPopup(!popup);
	};
	///////////////////////////////////////////////////////
	const handleNewTransaction = (event) => {
		event.preventDefault();
		console.log(event);
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
			date: diaMesAno,
		};
		(async () => {
			const res = await endPoints.postTransaction(newForm);
			setStatus(res.status);
		})();
	};
	////////////////////////////////////////////////////

	useEffect(() => {
		setTimeout(() => {
			if (status === 200) {
				setPopup(!popup);
				setStatus(500);
			}

			//
		}, 2000);
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
			{/* ////////////////FORM CONTENT////////////////////// */}
			{/* ///////////////////////////////////////////// */}
			{/* <form onSubmit={handleNewTransaction} className={style.subGrid}> */}

			{/* ////////////////INPUTS RADIO////////////////////// */}
			{/* ///////////////////////////////////////////// */}
			{/* <div className={style.popupRadio}> */}
			{/* <label>
									<input name='group1' type='radio' defaultChecked />
									<span>Despesa</span>
								</label>
								<label>
									<input name='group1' type='radio' />
									<span>Receita</span>
								</label> */}
			{/* </div> */}

			{/* //////////////////INPUTS TEXT/////////////////////// */}
			{/* ///////////////////////////////////////////// */}

			{/* <div className={style.desc}>
								<input placeholder='Descrição' id='Descrição' required></input>
								<label htmlFor='Descrição'>Descrição da transação</label>
							</div> */}

			{/* ///////////////////////////////////////////// */}

			{/* <div className={style.categ}>
								<input placeholder='Categoria' id='Categoria' required></input>
								<label htmlFor='Categoria'>Categoria</label>
							</div> */}

			{/* //////////////////INPUTS NUMBER////////////////////// */}
			{/* ///////////////////////////////////////////// */}

			{/* <div className={style.val}>
								<input
									type='number'
									min='0'
									placeholder='Valor'
									id='Valor'
									required></input>
								<label htmlFor='Valor'>Valor</label>
							</div> */}

			{/* /////////////////INPUTS DATE/////////////////////// */}
			{/* ///////////////////////////////////////////// */}
			{/* <div className={style.date}>
								<input type='date' id='date' required></input>
								<label htmlFor='date'>Data da transação</label>
							</div> */}
			{/* ///////////////////////////////////////////// */}

			{/* ///////////////////////////////////////////// */}
		</div>
	);
}

export default NewTransaction;
