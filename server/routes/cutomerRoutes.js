const express = require("express");
const router = express.Router;

// @desc    get Homepage
// @route   GET /api/
router.get("/");

// @desc    get all customers
// @route   GET /api/customers
router.get("/customers");

// @desc    get a single customer
// @route   GET /api/customer/:id
router.get("/customer");

// @desc    transfer amount to a customer
// @route   POST /api/customer/:id
router.get("/transaction");

module.exports = router;
