CREATE DATABASE Website;
USE Website;
CREATE TABLE Products(
	pid INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(80) NOT NULL,
    price INT NOT NULL,
    quantity INT,
    PRIMARY KEY(pid)
);
CREATE TABLE users (
	uid INT NOT NULL AUTO_INCREMENT,
	email VARCHAR(100) NOT NULL UNIQUE,
    passcode VARCHAR(100) NOT NULL,
    isAdmin boolean NOT NULL,
    PRIMARY KEY (uid)
);
INSERT INTO users (email, passcode,isAdmin) VALUES ('user@123','',FALSE),('admin@123','',TRUE),('acciojob@123','',FALSE);
-- passcode for user@123 = user123
-- passcode for admin@123 = admin123
UPDATE users SET passcode = 'e606e38b0d8c19b24cf0ee3808183162ea7cd63ff7912dbb22b5e803286b4446' WHERE email = 'user@123';
UPDATE users SET passcode = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9' WHERE email = 'admin@123';
UPDATE users SET passcode = 'b16baaf9b2a4970962eb22e883cabc0dc8e234a2e88868468212abd7ee9192a4' WHERE email = 'acciojob@123';
SELECT * FROM Products;
SELECT * FROM users;
DROP TABLE Products;
INSERT INTO Products (name, price)
VALUES ('Redmi Note 10 pro', 10000 ),
	   ('iphone 13', 60000 ),
	   ('inphone 13 pro', 90000 ),
       ('iphone 13 pro max', 125000 ),
       ('Samsun Galaxy Note 10', 120000 ),
       ('One Plus r', 35000);
UPDATE Products SET quantity = 1 WHERE pid = 2;
SELECT * FROM Products WHERE name LIKE '%iphone%'; 