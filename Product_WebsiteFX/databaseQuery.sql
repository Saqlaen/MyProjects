CREATE DATABASE Website;
USE Website;
CREATE TABLE Products(
	pid INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(80) NOT NULL,
    price DECIMAL(9,2) NOT NULL,
    quantity INT,
    PRIMARY KEY(pid)
);
DROP TABLE Products;
SELECT * FROM Products;

INSERT INTO Products (name, price)
VALUES ('Redmi Note 10 pro', 10000 ),
	   ('iphone 13', 60000 ),
	   ('inphone 13 pro', 90000 ),
       ('iphone 13 pro max', 125000 ),
       ('Samsun Galaxy Note 10', 120000 ),
       ('One Plus r', 35000);