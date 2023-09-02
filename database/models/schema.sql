-- Schema- Database and Table creation

-- Database
CREATE DATABASE Banking_System;
USE Banking_System;

-- Customers registry
CREATE TABLE CUSTOMER (
	customerEmail varchar (50) PRIMARY KEY,
    customerName varchar (30),
    cuurrentBalance int
);

-- Transactions record
CREATE TABLE TRANSFERS (
	transferID int AUTO_INCREMENT PRIMARY KEY,
    payerEmail varchar (50),
    payeeEmail varchar (50),
    amount int,
    FOREIGN KEY (payerEmail) REFERENCES CUSTOMER (customerEmail),
    FOREIGN KEY (payeeEmail) REFERENCES CUSTOMER (customerEmail)
);