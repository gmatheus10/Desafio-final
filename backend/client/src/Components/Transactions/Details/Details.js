import React from "react";
import style from "./Details.module.css";
function Details(props) {
	const { category, day, description, value, numberFormat } = props.properties;
	return (
		<li className={style.liContainer}>
			<div className={style.allBorder}>
				<div className={` ${style.day}`}>{day}</div>
				<div className={`${style.middle}`}>
					<p className={`${style.category}`}> {category}</p>
					<p className={`${style.description}`}>{description}</p>
				</div>
				<div className={`${style.value}`}>{numberFormat.format(value)}</div>
				<div className={style.editDelete}>
					<button>edit</button>
					<button>delete</button>
				</div>
			</div>
		</li>
	);
}

export default Details;
