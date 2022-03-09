const express = require("express");
const app = express();
const Joi = require("Joi");
//routers
const usersRouter = require("./usersRouter");

app.use(express.json());

const users = [
  {
    id: 745,
    username: "Marie",
    age: 38,
    city: "Paris",
    email: "marie@mail.com",
  },
  {
    id: 238,
    username: "Jean",
    age: 54,
    city: "Lyon",
    email: "jean@mail.com",
  },
];

// ROUTES
// GET ALL USERS
app.get("/", (_req, res) => {
  res.json(users);
})

app.use("*", (err, req, res, next) => {
  res.send("error");
});
app.listen(8080, () => console.log("Listen ..."));
