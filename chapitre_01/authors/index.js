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
})
// exercise 02 
app.get("/authors/:authorId", (req, res) => {
  const author = authors.find((author, index) => {
    return index.toString() === req.params.authorId; 
  });
  if (!author) {
    return res.json( "Author not found!")
  }
  res.json(`${author.name}, ${author.nationality}`);
});

app.listen(8080, () => {
  console.log("Listen on port 8080");
})