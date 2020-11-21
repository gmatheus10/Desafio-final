import React from "react";
import style from "./SelectPeriod.module.css";

function SelectPeriod(props) {
	const passPeriod = (event) => {
		props.onPeriodChange(event.target.value);
		console.log(event.target.value);
	};

	return (
		// <div className={`${style.selectContainer}`}>
		<div className={`${style.selectContainer}`}>
			{/* <div className={`${style.select} valign-wrapper`}> */}

			<div className={`${style.select} `}>
				<button className={`${style.selectB} `}>{" < "}</button>
				<select onChange={passPeriod} className={style.selectPeriod} required>
					<option defaultValue=''>Selecione um período</option>
					{props.periods.map((el) => (
						<option key={el}>{el}</option>
					))}
				</select>
				<button className={`${style.selectB} `}>{" > "}</button>
			</div>
		</div>
	);
}

export default SelectPeriod;
