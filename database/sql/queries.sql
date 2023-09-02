-- sql queries --
USE BANKING_SYSTEM;

-- to get all customers
SELECT *
FROM CUSTOMER;

-- to get a single customer
SELECT *
FROM CUSTOMER
WHERE customerEmail = 'sample@email.com';

-- ************* The following two queries will run asynchronously after the user has clicked 'Proceed' ************* --

-- 1. to check if a user/receiver exists
SELECT 1 
FROM CUSTOMER 
WHERE customerEmail = payeeEmail;

-- 2. to check if the sender has sufficient balance to perform transaction
SELECT cuurrentBalance >= amount AS sufficient_balance
FROM CUSTOMER
WHERE customerEmail = payerEmail;

-- ************* The following three queries will run asynchronously after the user has clicked 'Send' ************* --

-- 1. to update the current balance of the sender/payer
UPDATE CUSTOMER SET cuurrentBalance = cuurrentBalance - amount WHERE customerEmail = payerEmail;

-- 2. to update the current balance of the sender/payer
UPDATE CUSTOMER SET cuurrentBalance = cuurrentBalance + amount WHERE customerEmail = payeeEmail;

-- 3. to transfer amount
INSERT INTO 
TRANSFERS (payerEmail, payeeEmail, amount)
VALUES ('samplePayer@email.com', 'samplePayee@email.com', 1000);