const express = require("express");
const Joi = require("@hapi/joi");
const app = express();
//routers
// const usersRouter = require("./usersRouter");

app.use(express.json());

const schema = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  city: Joi.string().required(),
  age: Joi.number().min(10).max(99).required(),
});

const users = [
  {
    id: 745,
    name: "Marie",
    age: 38,
    city: "Paris",
    email: "marie@mail.com",
  },
  {
    id: 238,
    name: "Jean Jarre",
    age: 54,
    city: "Lyon",
    email: "jean@mail.com",
  },
];

// ROUTES
// GET ALL USERS
app.get("/", (_req, res) => {
  res.json(users);
});
// POST USER
app.post("/", (req, res) => {
  const user = req.body;
  const validationResult = schema.validate(user);
  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error,
    });
  }
  users.push(user);
  res.json({ message: "User has been added", users });
});
// GET USER BY NAME
app.get("/users/:name", (req, res) => {
  const user = users.find((user) => {
    return (
      user.name.replace(" ", "-").toLowerCase() ===
      req.params.name.replace(" ", "-").toLowerCase()
    );
  });
  if (!user) {
    return res.send("User not found");
  }
  res.json(user);
});

app.use("*", (err, req, res, next) => {
  res.send("error");
});
app.listen(8080, () => console.log("Listen ..."));
