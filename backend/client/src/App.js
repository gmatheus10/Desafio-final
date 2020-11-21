import React, { useState, useEffect } from "react";
import SelectPeriod from "./Components/SelectPeriod/SelectPeriod.js";
import Transactions from "./Components/Transactions/Transactions.js";
import endPoints from "./http/Requests.js";
import style from "./App.module.css";

export default function App() {
	const [periods, setPeriods] = useState([]);
	const [transactions, setTransactions] = useState([]);

	const numberFormat = new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	});

	useEffect(() => {
		(async () => {
			const data = await endPoints.getPeriods();
			setPeriods(data);
		})();
	}, []);

	const handlePeriodChange = (period) => {
		(async () => {
			const tran = await endPoints.getTransaction(period);

			setTransactions(tran);
		})();
	};

	return (
		<div className={style.body}>
			<header className={style.header}>
				<h1 className={style.title}>Desafio Final do Bootcamp Full Stack</h1>
			</header>

			<SelectPeriod periods={periods} onPeriodChange={handlePeriodChange} />

			<Transactions transactions={transactions} numberFormat={numberFormat} />

			<footer className={style.footer}>
				Site made by: Gabriel Matheus Conceição Medeiros Nunes
			</footer>
		</div>
	);
}
