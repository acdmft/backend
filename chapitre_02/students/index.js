const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env"
});
const { Pool } = require("pg");
const Postgres = new Pool({ssl: {rejectUnauthorized: false}});

app.use(express.json());
app.use(cors());

const students = [
	{
		id: 1,
		name: "Nicolas",
		age: 18,
		gender: "M",
	},
	{
		id: 2,
		name: "Anita",
		age: 26,
		gender: "F",
	},
	{
		id: 3,
		name: "Djibril",
		age: 29,
		gender: "M",
	},
];

app.get("/students", async (req, res) => {
	const students = await Postgres.query(
		"SELECT * FROM students"
		);
  res.json(students.rows);
});
app.post("/students", (req, res) => {
  students.push({
    id: students.length + 1,
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
  })
  res.send(students);
});


app.get("*", (_,res) => {
  res.status(404).send("Page not found");
});

app.listen(8080, () => console.log("Listening..."));