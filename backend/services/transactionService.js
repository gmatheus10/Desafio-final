const mongoose = require("mongoose");
const logger = require("../logger/logger.js");
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require("../models/TransactionModel");

//do the functions to the routes endpoints

//FIND A TRANSACTION OR FIND ALL
const find = async (req, res) => {
	const period = req.query.period;

	//condicao para o filtro no findAll
	var condition = period
		? { yearMonth: { $regex: new RegExp(period), $options: "i" } }
		: {};

	try {
		const Transaction = await TransactionModel.find(condition).sort({
			year: "asc",
			month: "asc",
			day: "asc",
		});
		logger.info(`GET /transaction`);
		res.send(Transaction);
	} catch (error) {
		res
			.status(500)
			.send({ message: error.message || "Erro ao listar todos os documentos" });
		logger.error(`GET /transaction - ${JSON.stringify(error.message)}`);
	}
};
//FIND A SPECIFIC TRANSACTION
const findOne = async (req, res) => {
	const id = req.params.id;

	try {
		const Transaction = await TransactionModel.findById(id);
		if (!Transaction) {
			throw new Error("Registro nao encontrado");
		} else {
			const resTran = {
				type: Transaction.type,
				description: Transaction.description,
				category: Transaction.category,
				value: Transaction.value,
				yearMonthDay: Transaction.yearMonthDay,
			};
			res.send(resTran);
			logger.info(`GET /transaction - ${id}`);
		}
	} catch (error) {
		res.status(500).send({ message: "Erro ao buscar a transação - id: " + id });
		logger.error(`GET /transaction - ${JSON.stringify(error.message)}`);
	}
};
//GET ALL PERIODS
const getPeriods = async (req, res) => {
	try {
		const Transaction = await TransactionModel.find({}).sort({
			year: "asc",
			month: "asc",
			day: "asc",
		});
		let periods = Transaction.map((tran) => {
			return tran.yearMonth;
		});
		periods = periods.filter((tran, index) => {
			return periods.indexOf(tran) === index;
		});
		res.send(JSON.stringify(periods));
	} catch (error) {
		res
			.status(500)
			.send({ message: "Erro ao buscar os períodos " + error.message });
	}
};
//CREATE NEW TRANSACTION
const create = async (req, res) => {
	try {
		const newTransaction = new TransactionModel(req.body);
		newTransaction.save((err) => {
			if (err) {
				throw new Error(err.message);
			} else {
				res.send(newTransaction);
				logger.info(
					`POST /transaction - ${JSON.stringify(newTransaction, null, 2)}`
				);
			}
		});
	} catch (error) {
		res
			.status(500)
			.send({ message: error.message || "Algum erro ocorreu ao salvar" });
		logger.error(`POST /transaction - ${JSON.stringify(error.message)}`);
	}
};
//UPDATE A TRANSACTION
const update = async (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: "Dados para atualizacao vazio",
		});
	}

	const id = req.params.id;

	try {
		const Transaction = await TransactionModel.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		logger.info(`PUT /transaction - ${id} - ${JSON.stringify(Transaction)}`);
		res.send(Transaction);
	} catch (error) {
		res
			.status(500)
			.send({ message: "Erro ao atualizar a transaction id: " + id });
		logger.error(`PUT /transaction - ${JSON.stringify(error.message)}`);
	}
};
//CORRECT A TRANSACTION
const correct = async (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: "Dados para atualizacao vazio",
		});
	}
	const id = req.params.id;
	try {
		const Transaction = await TransactionModel.findByIdAndUpdate(
			id,
			req.body,
			{ new: true },
			(err) => {
				if (err) {
					throw new Error("Registro não encontrado");
				}
			}
		);
		res.send(Transaction);
		logger.info(`PATCH /transaction - ${id} - ${JSON.stringify(Transaction)}`);
	} catch (error) {
		res
			.status(500)
			.send({ message: "Erro ao atualizar a transaction id: " + id });
		logger.error(`PUT /transaction - ${JSON.stringify(error.message)}`);
	}
};
//DELETE A TRANSACTION
const remove = async (req, res) => {
	const id = req.params.id;

	try {
		const transToDelete = await TransactionModel.findOne({ _id: ObjectId(id) });
		if (!transToDelete) {
			throw new Error("Registro não encontrado");
		} else {
			await TransactionModel.deleteOne(transToDelete, (err) => {
				if (err) {
					throw new Error("Não foi possível deletar");
				} else {
					res.send("deleted successfully");
					logger.info(`DELETE /transaction - ${id}`);
				}
			});
		}
	} catch (error) {
		res
			.status(500)
			.send({ message: "Nao foi possivel deletar o transaction id: " + id });
		logger.error(`DELETE /transaction - ${JSON.stringify(error.message)}`);
	}
};
//DELETE ALL DATA
const deleteAll = async (req, res) => {
	try {
		await TransactionModel.deleteMany({});
		res.send("Deleted all - database empty");
		logger.info(`DELETE /transaction`);
	} catch (error) {
		res.status(500).send({ message: "Erro ao excluir todos as transactions" });
		logger.error(`DELETE /transaction - ${JSON.stringify(error.message)}`);
	}
};
module.exports = {
	create,
	remove,
	find,
	findOne,
	update,
	correct,
	deleteAll,
	getPeriods,
};
