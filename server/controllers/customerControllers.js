const db = require("../config/connect_db");
const promisingDb = require("../config/promiseConnect_db");
const {
  qGetAllCustomers,
  qGetACustomer,
  qRecordTransaction,
  qUpdatePayerBal,
  qUpdatePayeeBal,
  qPayeeExists,
  qSufficientBal,
} = require("../sql/queries");
const logger = require("../utils/logger");

// @desc    get Homepage
// @route   GET /api/
const getHomepage = (req, res) => {
  res.status(200).json({ message: "Homepage" });
};

// @desc    get all customers
// @route   GET /api/customers
const getAllCustomers = (req, res) => {
  db.query(qGetAllCustomers, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error retreiving the customers." });
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: "No Customers registered." });
      } else {
        res.status(200).json(result);
      }
    }
  });
};

// @desc    get a single customer
// @route   GET /api/customer/:email
const getACustomer = (req, res) => {
  const customerEmail = req.params.email;

  db.query(qGetACustomer, [customerEmail], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error retreiving the customer." });
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: "No Customers registered." });
      } else {
        res.status(200).json(result);
      }
    }
  });
};

// @desc    transfer amount to a customer
// @route   POST /api/customer/:email
const transferAmount = async (req, res) => {
  const payerEmail = req.params.email;
  const { payeeEmail, amount } = req.body;

  try {
    const [payeeExists] = await promisingDb.execute(qPayeeExists, [payeeEmail]);
    if (payeeExists.length === 0) {
      logger.info(
        `@Failure: No Payee Existed\nPayer: ${payerEmail}\nPayee: ${payeeEmail}\nAmount: ${amount}\n`
      );
      return res.status(404).json({ error: "Customer not found." });
    }

    const [sufficientBalance] = await promisingDb.execute(qSufficientBal, [
      amount,
      payerEmail,
    ]);
    if (
      sufficientBalance.length === 0 ||
      !sufficientBalance[0].sufficient_balance
    ) {
      logger.info(
        `@Failure: Insufficient Balance\nPayer: ${payerEmail}\nPayee: ${payeeEmail}\nAmount: ${amount}\n`
      );
      return res.status(400).json({
        error: "Insufficient balance to proceed with the transaction.",
      });
    }

    // updating payer balance
    await promisingDb.execute(qUpdatePayerBal, [amount, payerEmail]);

    // updating payee balance
    await promisingDb.execute(qUpdatePayeeBal, [amount, payeeEmail]);

    // recording transaction
    await promisingDb.execute(qRecordTransaction, [
      payerEmail,
      payeeEmail,
      amount,
    ]);

    await promisingDb.commit();

    logger.info(
      `@Success\nPayer: ${payerEmail}\nPayee: ${payeeEmail}\nAmount: ${amount}\n`
    );

    res.status(200).json({ message: "Transaction Successful." });
  } catch (error) {
    await promisingDb.rollback();

    logger.info(
      `@Failure: Internal Error\nPayer: ${payerEmail}\nPayee: ${payeeEmail}\nAmount: ${amount}\n`
    );

    res.status(500).json({ error: "Error: Transaction Failed." });
  }
};

module.exports = {
  getHomepage,
  getAllCustomers,
  getACustomer,
  transferAmount,
};
