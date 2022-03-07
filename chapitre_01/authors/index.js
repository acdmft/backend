const express = require("express");
const app = express();

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
app.get("/", (req, res) => {
  res.send("Authors API");
});
// exercise 02 
app.get("/authors/:authorId", (req, res) => {
  const author = authors[parseInt(req.params.authorId) -1];
  if (!author) {
    return res.json( "Author not found!");
  }
  res.json(`${author.name}, ${author.nationality}`);
});
// exercise 03
app.get("/authors/:authorId/books", (req,res) => {
  const author = authors[parseInt(req.params.authorId) - 1];

  if (!author) {
    return res.json("Author not found!");
  } 
  res.json(author.books.join(", "));
});
app.listen(8080, () => {
  console.log("Listen on port 8080");
})