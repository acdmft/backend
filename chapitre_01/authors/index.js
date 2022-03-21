const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env"
})
const { Pool } = require("pg");
const Postgres = new Pool({ssl: {rejectUnauthorized: false }})

app.use(express.json());


const authors = [
  {
      name: "Lawrence Nowell",
      nationality: "UK",
      books: ["Beowulf"]
  },
  {
      name: "William Shakespeare",
      nationality: "UK",
      books: ["Hamlet", "Othello", "Romeo and Juliet", "MacBeth"]
  },
  {
      name: "Charles Dickens",
      nationality: "US",
      books: ["Oliver Twist", "A Christmas Carol"]
  },
  {
      name: "Oscar Wilde",
      nationality: "UK",
      books: ["The Picture of Dorian Gray", "The Importance of Being Earnest"]
  },
]
// exercise 01
app.get("/authors", async (req, res) => {
  const authors = await Postgres.query(
    "SELECT * FROM authors"
  );
  res.json(authors.rows);
});
// exercise 02 
app.get("/authors/:authorId", async (req, res) => {
  const author = await Postgres.query(
    'SELECT name FROM authors WHERE id=$1', [req.params.authorId]
  );
  console.log(author.rows)
  res.json(author.rows);
});
// exercise 03
app.get("/authors/:authorId/books", async (req,res) => {
  const books = await Postgres.query(
    'SELECT books FROM authors WHERE id=$1', [req.params.authorId]
  );
  res.json(books.rows[0].books.join(", "));
});
//exercise 04 
app.get("/json/authors/:authorId", (req, res) => {
  const author = authors[parseInt(req.params.authorId) -1];
  if (!author) {
    return res.json( "Author not found!");
  }
  
  res.json({name: author.name, nationality: author.nationality});
});

app.get("/json/authors/:authorId/books", (req,res) => {
  const author = authors[parseInt(req.params.authorId) - 1];

  if (!author) {
    return res.json("Author not found!");
  } 
  res.json({books: author.books});
});

app.get('*', (_req, res) => { 
  res.status(404).json("404 error");
})

app.listen(8080, () => {
  console.log("Listen on port 8080");
});