// to get all customers
const qGetAllCustomers = `
    SELECT *
    FROM CUSTOMER;    
`;

// to get a single customer
const qGetACustomer = `
    SELECT *
    FROM CUSTOMER
    WHERE customerEmail = ?;
`;

const qGetCustomersLessOne = `
    SELECT *
    FROM CUSTOMER
    WHERE customerEmail <> ?;
`;

// to get the history of transactions made by the Payer(customer): Debits
const qDebitHistory = `
    SELECT 
        t.transferID,
        t.payeeEmail,
        t.amount
    FROM CUSTOMER c
    JOIN TRANSFERS t ON c.customerEmail = t.payerEmail
    WHERE c.customerEmail = ?
    ORDER BY t.transferID DESC;;
`;

// to get the history of transactions made to the Payer(customer): Credits
const qCreditHistory = `
    SELECT 
        t.transferID,
        t.payerEmail,
        t.amount
    FROM CUSTOMER c
    JOIN TRANSFERS t ON c.customerEmail = t.payeeEmail
    WHERE c.customerEmail = ?
    ORDER BY t.transferID DESC;;
`;

// ----------------------------------------------------Transaction----------------------------------------------------

// -- ************* The following two queries will run asynchronously after the user has clicked 'Proceed' ************* --

// to check if a user/receiver exists
const qPayeeExists = `
    SELECT 1 
    FROM CUSTOMER 
    WHERE customerEmail = ?;
`;

// to check if the sender has sufficient balance to perform transaction
const qSufficientBal = `
    SELECT CASE WHEN cuurrentBalance >= ? THEN 1 ELSE 0 END AS sufficient_balance
    FROM CUSTOMER
    WHERE customerEmail = ?;
`;

// -- ************* The following three queries will run asynchronously after the user has clicked 'Send' ************* --

// to update the current balance of the sender/payer
const qUpdatePayerBal = `
    UPDATE CUSTOMER 
    SET cuurrentBalance = cuurrentBalance - ? WHERE customerEmail = ?;
`;

// to update the current balance of the sender/payer
const qUpdatePayeeBal = `
    UPDATE CUSTOMER 
    SET cuurrentBalance = cuurrentBalance + ? WHERE customerEmail = ?;
`;
// to transfer amount
const qRecordTransaction = `
    INSERT INTO 
    TRANSFERS (payerEmail, payeeEmail, amount)
    VALUES (?, ?, ?);
`;

module.exports = {
  qGetAllCustomers,
  qGetACustomer,
  qGetCustomersLessOne,
  qDebitHistory,
  qCreditHistory,
  qPayeeExists,
  qSufficientBal,
  qUpdatePayerBal,
  qUpdatePayeeBal,
  qRecordTransaction,
};
