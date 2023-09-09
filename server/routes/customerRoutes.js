const express = require("express");
const router = express.Router();
const {
  getHomepage,
  getCustomersLessOne,
  getAllCustomers,
  getACustomer,
  getDebitHistory,
  getCreditHistory,
  transferAmount,
} = require("../controllers/customerControllers");

// @desc    get Homepage
// @route   GET /api/
router.get("/", getHomepage);

// @desc    get all customers less one
// @route   GET /api/customer/less/:email
router.get("/customer/less/:email", getCustomersLessOne);

// @desc    get all customers
// @route   GET /api/customers
router.get("/customers", getAllCustomers);

// @desc    get a single customer
// @route   GET /api/customer/:email
router.get("/customer/:email", getACustomer);

// @desc    get Debit History
// @route   GET /api/customer/debits/:email
router.get("/customer/debits/:email", getDebitHistory);

// @desc    get Credit History
// @route   GET /api/customer/credits/:email
router.get("/customer/credits/:email", getCreditHistory);

// @desc    transfer amount to a customer
// @route   POST /api/customer
router.post("/customer/:email", transferAmount);

module.exports = router;
