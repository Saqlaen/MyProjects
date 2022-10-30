CREATE DATABASE library;
USE library;
CREATE TABLE books (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(80) NOT NULL,
    author VARCHAR(80) NOT NULL,
    year INT NOT NULL,
    pages INT NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO books (title, author, year, pages) 
VALUES ('witcher','emily blonde', 1991, 4600);

SELECT * FROM books;