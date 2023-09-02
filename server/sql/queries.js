// to get all customers
const getAllCustomers = `
    SELECT *
    FROM CUSTOMER;    
`;

// to get a single customer
const getACustomer = `
    SELECT *
    FROM CUSTOMER
    WHERE customerEmail = 'sample@email.com';
`;

// -- ************* The following two queries will run asynchronously after the user has clicked 'Proceed' ************* --

// to check if a user/receiver exists
const payeeExists = `
    SELECT 1 
    FROM CUSTOMER 
    WHERE customerEmail = payeeEmail;
`;

// to check if the sender has sufficient balance to perform transaction
const sufficientBal = `
    SELECT cuurrentBalance >= amount AS sufficient_balance
    FROM CUSTOMER
    WHERE customerEmail = payerEmail;
`;

// -- ************* The following three queries will run asynchronously after the user has clicked 'Send' ************* --

// to update the current balance of the sender/payer
const updatePayerBal = `
    UPDATE CUSTOMER 
    SET cuurrentBalance = cuurrentBalance - amount WHERE customerEmail = payerEmail;
`;

// to update the current balance of the sender/payer
const updatePayeeBal = `
    UPDATE CUSTOMER 
    SET cuurrentBalance = cuurrentBalance + amount WHERE customerEmail = payeeEmail;
`;
// to transfer amount
const recordTransaction = `
    INSERT INTO 
    TRANSFERS (payerEmail, payeeEmail, amount)
    VALUES ('samplePayer@email.com', 'samplePayee@email.com', 1000);
`;
