import React from "react";
import style from "./SelectPeriod.module.css";

function SelectPeriod(props) {
	const passPeriod = (event = null, string = "") => {
		if (string !== "") {
			props.onPeriodChange(string);
		} else {
			event.preventDefault();
			props.onPeriodChange(event.target.value);
		}
	};

	const changePeriod = (event) => {
		const direction = event.target.textContent;
		let period =
			event.target.previousSibling !== null
				? event.target.previousSibling
				: event.target.nextSibling;
		if (
			direction.includes(">") &&
			period.selectedIndex !== period.childNodes.length - 1
		) {
			period.selectedIndex += 1;
		} else if (direction.includes("<") && period.selectedIndex !== 0) {
			period.selectedIndex -= 1;
		}

		passPeriod(null, period.value);
	};
	return (
		// <div className={`${style.selectContainer}`}>
		<div className={`${style.selectContainer}`}>
			{/* <div className={`${style.select} valign-wrapper`}> */}

			<div className={`${style.select} `}>
				<button onClick={changePeriod} className={`${style.selectB} `}>
					{" < "}
				</button>

				{props.load ? (
					<select onInput={passPeriod} className={style.selectPeriod} required>
						<option defaultValue=''>Selecione um período</option>
						{props.periods.map((el) => (
							<option key={el}>{el}</option>
						))}
					</select>
				) : (
					<div>loading</div>
				)}
				<button onClick={changePeriod} className={`${style.selectB} `}>
					{" > "}
				</button>
			</div>
		</div>
	);
}

export default SelectPeriod;
