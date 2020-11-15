const express = require("express");
const router = express.Router();
//do the express endpoints
const transService = require("../services/transactionService.js");

router.get("/findTransactions", transService.find);
router.get("/findOneTransaction/:id", transService.findOne);
router.post("/newTransaction", transService.create);
router.put("/updateTransaction/:id", transService.update);
router.patch("/correctTransaction/:id", transService.correct);
router.delete("/deleteTransaction/:id", transService.remove);
router.delete("/deleteAll", transService.deleteAll);
module.exports = router;
