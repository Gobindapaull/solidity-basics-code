const express = require("express");
const router = express.Router();

const { getTokenInfo, transferToken, getBalance, burnToken, createToken } = require("../controllers/tokenController");

router.get("/info", getTokenInfo);
router.get("/balance/:address", getBalance)

router.post("/transfer", transferToken);
router.post("/create", createToken);
router.post("/burn", burnToken)

module.exports = router;
