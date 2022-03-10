const express = require("express");
const app = express();
const axios = require("axios");
const res = require("express/lib/response");

const countries = require("./dataCountries");

// Routes
// GET ALL COUNTRIES
app.get("/countries/all", (_req, res) => {
  const data = countries.map((country) => {
    return country.name.common;
  });
  res.json(data);
});
// GET COUNTRY BY NAME
app.get("/countries/name/:name", (req, res) => {
  const country = countries.find((country) => {
    return (
      country.name.common.replace(" ", "-").toLowerCase() ===
      req.params.name.replace(" ", "-").toLowerCase()
    );
  });
  if (country) {
    return res.json(country);
  }
  res.send("Country not found");
});

// Axios request
let countriesNames = [];

// function getCountries() {
axios.get("http://localhost:8080/countries/all").then((res) => {
  console.log(res.data);
});
// }
// getCountries();

app.use("*", (err, req, res, next) => {
  res.send("Error");
});

app.listen(8080, () => {
  console.log("Listen on port 8080");
});
