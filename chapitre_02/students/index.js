const express = require("express");
const app = express();

app.use(express.json());

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

app.get("/students", (req, res) => {
  res.json(students);
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