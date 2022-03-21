CREATE TABLE authors(
id SERIAL PRIMARY KEY,
name VARCHAR(255),
nationality VARCHAR(255) ,
books TEXT []
);
INSERT INTO authors(name, nationality, books) 
VALUES('Lawrence Nowell', 'UK', ARRAY ['Beowulf']);
INSERT INTO authors(name, nationality, books) 
VALUES('William Shakespeare', 'UK', ARRAY ['Hamlet', 'Othello', 'Romeo and Juliet', 'MacBeth']),
('Charles Dickens', 'US', ARRAY ['Oliver Twist', 'A Christmas Carol']), 
('Oscar Wilde', 'UK', ARRAY ['The Picture of Dorian Gray', 'The Importance of Being Earnest']);

SELECT name, nationality FROM authors WHERE authors.id=2;