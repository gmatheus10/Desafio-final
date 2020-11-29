import React from "react";
import style from "./Summary.module.css";

function Summary(props) {
	const { transactions, numberFormat } = props;

	const getProfit = (type) => {
		const expenseRes = transactions.filter((el) => {
			return el.type === "-";
		});
		const revenueRes = transactions.filter((el) => {
			return el.type === "+";
		});
		const expense = expenseRes.length
			? expenseRes.reduce((acc, cur) => {
					return acc + parseFloat(cur.value);
			  }, 0)
			: 0;
		const revenue = revenueRes.length
			? revenueRes.reduce((acc, cur) => {
					return acc + parseFloat(cur.value);
			  }, 0)
			: 0;
		const balance = revenue - expense;
		if (type === "+") {
			return revenue;
		} else if (type === "-") {
			return expense;
		} else {
			return balance;
		}
	};

	return (
		<div>
			{transactions.length ? (
				<div className={style.summaryContainer}>
					<span className={style.span}>Lançamentos: {transactions.length}</span>
					<span className={style.span}>Receita: {getProfit("+")}</span>
					<span className={style.spanDesp}>Despesa: {getProfit("-")}</span>
					<span className={style.span}>Saldo: {getProfit("=")}</span>
				</div>
			) : null}
		</div>
	);
}

export default Summary;
