const express = require("express");
const router = express.Router();
const {
  getHomepage,
  getAllCustomers,
  getACustomer,
  transferAmount,
} = require("../controllers/customerControllers");

// @desc    get Homepage
// @route   GET /api/
router.get("/", getHomepage);

// @desc    get all customers
// @route   GET /api/customers
router.get("/customers", getAllCustomers);

// @desc    get a single customer
// @route   GET /api/customer/:email
router.get("/customer/:email", getACustomer);

// @desc    transfer amount to a customer
// @route   POST /api/customer
router.post("/customer/:email", transferAmount);

module.exports = router;
