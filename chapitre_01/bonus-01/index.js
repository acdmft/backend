const express = require("express");
const app = express();
const axios = require("axios");
const res = require("express/lib/response");

const countries = require("./dataCountries");

// Routes
app.get("/countries/all", (req, res) => {
  const data = countries.map((country) => {
    return country.name.common;
  });
  res.json(data);
});

// Axios request
let countriesNames = [];

// function getCountries() {
  axios.get("http://localhost:8080/countries/all")
  .then((res) => {
    console.log(res.data);
    });
// }
// getCountries();

app.listen('*', (_req, res) => {
  res.status(404).send("Page not found");
});


app.listen(8080, () => {
  console.log("Listen on port 8080");
});