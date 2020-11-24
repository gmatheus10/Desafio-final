import React from "react";
import style from "./Form.module.css";

function Form(props) {
	const { inputs } = props;
	const passEvent = (event) => {
		props.submit(event);
	};
	return (
		<form onSubmit={passEvent} className={style.subGrid}>
			{inputs.map((el) => {
				return (
					<div className={style[el.id]} key={el.id}>
						<input
							type={el.type}
							name={el.group ? el.group : el.type}
							placeholder={el.type === "text" ? el.label : null}
							required></input>
						<label htmlFor={el.id}> {el.label} </label>
					</div>
				);
			})}
			{/* <div className={style.submit}> */}
			<div className={style.submit}>
				{props.status === 200 ? (
					<span>Registro inserido com sucesso</span>
				) : (
					<button type='submit'>Submit</button>
				)}
			</div>
		</form>
	);
}

export default Form;
