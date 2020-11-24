import React from "react";
import style from "./Popup.module.css";

function Popup(props) {
	const popUpChange = () => {
		props.onPopupChange();
	};
	return (
		<div className={`${style.popupContainer}`}>
			<div className={`${style.popup}`}>
				<div className={style.closeMe}>
					<button onClick={popUpChange}>X</button>
				</div>
				<div className={style.title}>
					<span>{props.title}</span>
				</div>
				{props.content}
			</div>
		</div>
	);
}

export default Popup;
