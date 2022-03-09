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
  age: Joi.number().min(10).max(99).required(),
});

// ROUTES

// GET ALL USERS
router.get("/", (_req, res) => {
  res.json(users);
}); 
// POST USER
router.post("/", (req, res) => {
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

module.exports = router;