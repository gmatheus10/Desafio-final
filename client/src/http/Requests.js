import axios from "axios";
async function getPeriods() {
	try {
		const res = await axios.get("/api/transaction/");
		return res.data;
	} catch (error) {
		console.log(error);
	}
}
async function getTransaction(period) {
	try {
		const res = await axios.get(
			`/api/transaction/findTransactions?period=${period}`
		);
		return res.data;
	} catch (error) {
		console.log(error);
	}
}

async function postTransaction(transactionBody) {
	try {
		const jsonBody = transactionBody;
		const res = await axios.post("/api/transaction/newTransaction", jsonBody);
		return res;
	} catch (error) {
		console.log(error);
	}
}
async function patchTransaction(id, transactionBody) {
	try {
		const jsonBody = transactionBody;

		const res = await axios.patch(
			`/api/transaction/correctTransaction/${id}`,
			jsonBody
		);

		return res;
	} catch (error) {
		console.log(error);
	}
}
async function deleteTransaction(id) {
	try {
		const res = await axios.delete(`/api/transaction/deleteTransaction/${id}`);
		return res;
	} catch (error) {
		console.log(error);
	}
}
export default {
	getPeriods,
	getTransaction,
	postTransaction,
	patchTransaction,
	deleteTransaction,
};
