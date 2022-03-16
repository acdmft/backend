const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");

// USERS 
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
// JOI VALIDATION SCHEMA (need to improve email validation)
const schema = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  city: Joi.string().required(),
  age: Joi.number().integer().min(1).max(99).strict().required(),
});
function validUser(req, res, next) {
  const user = req.body;
  const validationResult = schema.validate(user);
  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error,
      description: validationResult.error.details[0].message,
    });
  }
  next();
}

// ROUTES

// GET ALL USERS
router.get("/", (_req, res) => {
  res.json(users);
}); 
// POST USER
router.post("/", validUser, (req, res) => {
  const user = req.body;
  // create id for new user 
  const id = users[users.length - 1].id + 1;
  user.id = id;
  users.push(user);
  res.json({ message: "User has been added", users });
});
// GET USER BY NAME
router.get("/users/:name", (req, res) => {
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
// GET USER BY ID
router.get("/user/id/:id", (req, res) => {
  const user = users.find((user)=> {
    return user.id.toString() === req.params.id;
  })
  if (!user) {
    return res.send("User not found");
  }
  res.json(user);
});
// GET USER BY EMAIL
router.get("/user/email/:email", (req, res) => {
  const user = users.find((user)=> {
    return user.email === req.params.email;
  });
  if (!user) {
    return res.send("User not found");
  }
  res.json(user);
});

module.exports = router;