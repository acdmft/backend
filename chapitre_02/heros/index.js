const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
  path: "../config.env"
})
const { Pool } = require("pg");
const res = require("express/lib/response");
const Postgres = new Pool({ssl: {rejectUnauthorized: false}});

// DEBUG MIDDLEWARE
const debug = (req, res, next) => {
  console.log("Call from debug middleware");
  next();
};
// transformName MIDDLEWARE
const transformName = (req, res, next) => {
  if (req.body.name) {
    req.body.name = req.body.name.toLowerCase();
  }
  next();
};
// findHero MIDDLEWARE (finds hero by name)
const findHero = async (req, _res, next) => {
  let hero;
  try {
    hero = await Postgres.query(
      "SELECT * FROM heroes WHERE name = $1",
      [req.params.name]
      );
  } catch(err) {
    return res.json({message: err});
  }
  req.hero = hero.rows;
  next();
}

app.use(debug);
app.use(express.json());

// SUPERHEROS
const superHeros = [
  {
    name: "Iron Man",
    power: ["money"],
    color: "red",
    isAlive: true,
    age: 46,
    image:
      "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart",
  },
  {
    name: "Thor",
    power: ["electricity", "worthy"],
    color: "blue",
    isAlive: true,
    age: 300,
    image:
      "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg",
  },
  {
    name: "Daredevil",
    power: ["blind"],
    color: "red",
    isAlive: false,
    age: 30,
    image:
      "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg",
  },
];
// GET all heroes
app.get("/heroes", async (_req, res) => {
  let heroes;
  try {
    heroes = await Postgres.query(
      "SELECT * FROM heroes"
    );
  } catch (err) {
    return res.status(400).json({message: err })
  }
  res.json(heroes.rows);

});
// GET hero by his name
app.get("/heroes/:name", findHero, (req, res) => {
  res.json(req.hero);
});
// GET the powers of hero
app.get("/heroes/:name/powers", findHero, (req, res) => {
  res.json(req.hero.power);
});
// POST A HERO
app.post("/heroes", transformName, (req, res) => {
  // check if hero already exist 
  const heroExist = superHeros.find((hero) => {
    return (
      hero.name.toLowerCase().replace(" ", "-") ===
      req.body.name.toLowerCase().replace(" ", "-")
    );
  });
  if (!heroExist) {
    superHeros.push(req.body);
    return res.json({
      message: "Ok, hero is added",
      hero: superHeros[superHeros.length - 1],
    });
  }
  res.send(`Hero with name "${req.body.name}" already exist`);
});
// PATCH A HERO'S POWERS
app.patch("/heroes/:name/powers", findHero, (req, res) => {
  const hero = req.hero; 
  hero.power.push(req.body.power);
  res.json({message: "Power added", hero: req.hero});
});
// 404 PAGE
app.get("*", (_req, res) => {
  res.status(404).send("Page not found");
});

app.listen(8080, () => console.log("Server started"));
