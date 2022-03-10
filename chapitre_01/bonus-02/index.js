const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json());

// POKEMONS
const pokemons = [];
axios
  .get("https://pokeapi.co/api/v2/pokemon?limit=26&offset=26")
  .then((res) => {
    pokemons.push(res.data.results);
  });
console.log(pokemons);

//ROUTES
// GET ALL POKEMONS
app.get("/all", (_req, res) => {
  res.send(pokemons);
});
// GET POKEMON BY ID
app.get("/id/:id", (req, res) => {
  const pokemon = pokemons[0].find((pokemon, index) => {
    return index === parseInt(req.params.id);
  });

  if (!pokemon) {
    res.send(`Pokemon with id: ${req.params.id} not found`);
  }
  res.send(pokemon.name);
});

app.get("*", (_req, res) => {
  res.status(404).send("Page not found");
});

app.listen(8080, () => console.log("Listen port 8080..."));
