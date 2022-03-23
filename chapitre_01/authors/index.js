const express = require("express");
const app = express();
// const dotenv = require("dotenv");
// dotenv.config({
//   path: "./config.env"
// });
// const { Pool } = require("pg");
// const Postgres = new Pool({ssl: {rejectUnauthorized: false }})
const Author = require("./models/authorModel");
const mongoose = require("mongoose");
const { user } = require("pg/lib/defaults");

app.use(express.json());

//connect to mongoDB
mongoose.connect(
  "mongodb+srv://andrei:DSzKj3wdfukTAOqi@cluster0.wny66.mongodb.net/konexio-mongo?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
)
.then(() => console.log("Connected to MongoDB"));

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
// app.get("/authors", async (req, res) => {
//   const authors = await Postgres.query(
//     "SELECT * FROM authors"
//   );
//   res.json(authors.rows);
// });
// GET ALL AUTHORS 
app.get("/authors", async (req, res) => {
  const authors = await Author.find();
  res.json(authors);
});
// POST AUTHOR 
app.post("/authors", async (req, res) => {
  await Author.create(req.body);
  res.status(201).json({
    message: "Author created",
  })
});

// exercise 02 

// GET AUTHOR BY ID
// app.get("/authors/:authorId", async (req, res) => {
//   const author = await Postgres.query(
//     'SELECT name FROM authors WHERE id=$1', [req.params.authorId]
//   );
//   console.log(author.rows)
//   res.json(author.rows);
// });
app.get("/authors/:id", async (req, res) => {
  const author = await Author.findById(req.params.id);
  res.json(author);
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