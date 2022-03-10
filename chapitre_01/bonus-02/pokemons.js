const axios = require("axios");

const pokemons = [];
axios.get("https://pokeapi.co/api/v2/pokemon?limit=26&offset=26")
  .then((res) => {
    pokemons.push(res.data.results);
  });

module.exports = pokemons;