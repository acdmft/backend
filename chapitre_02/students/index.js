const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({
  path: "../config.env"
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
app.post("/students", async (req, res) => {
	try {
		await Postgres.query(
			"INSERT INTO students(name, age, gender) VALUES ($1, $2, $3)", 
			[req.body.name, req.body.age, req.body.gender]
		)
	} catch(err) {
		return res.status(400).json({
			message: "Error! Bad data received!"
		})
	}
  res.json({message: `Student ${req.body.name} added to the database`});
});


app.get("*", (_,res) => {
  res.status(404).send("Page not found");
});

app.listen(8080, () => console.log("Listening..."));