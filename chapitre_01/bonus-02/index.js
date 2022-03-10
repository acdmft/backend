const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json());

// POKEMONS 
const pokemons = [];
// async function getPokemons() {
//   let result = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=26&offset=26");
//   pokemons.push(result.data);
// } 
// getPokemons();
axios.get("https://pokeapi.co/api/v2/pokemon?limit=26&offset=26")
  .then((res) => {
    pokemons.push(res.data);
  });
//ROUTES 
// GET ALL POKEMONS 
app.get("/all", (_req, res) => {
  res.send(pokemons);
});

app.get("*", (_req, res) => {
  res.status(404).send("Page not found");
})

app.listen(8080, () => console.log("Listen port 8080..."));