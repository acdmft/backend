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
      "SELECT * FROM heroes WHERE LOWER(name) = $1",
      [req.params.name.toLowerCase()]
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
  res.json(req.hero[0].power.join(', '));
});
// POST A HERO
app.post("/heroes", transformName, async (req, res) => {
  try {
    await Postgres.query(
      "INSERT INTO heroes(name, power, color, isAlive, age, image) VALUES ($1, $2, $3, $4, $5, $6)",
      [req.body.name, req.body.power, req.body.color, req.body.isAlive, req.body.age, req.body.image]
    )
  } catch(err) {
    return res.json({message: err})
  }
  res.json({message: `user ${req.body.name} created`})
});
// PATCH A HERO'S POWERS
app.patch("/heroes/:name/powers", findHero, async (req, res) => {
  const hero = req.hero[0]; 
  console.log(typeof req.body.power, hero);
  try {
    await Postgres.query(
      "UPDATE heroes SET power = $1 WHERE id = $2",
      [req.body.power, hero.id]
    )
  } catch(err) {
    return res.json({message: err});
  }
  res.json({message: "Power added", hero: req.hero.name});
});
// 404 PAGE
app.get("*", (_req, res) => {
  res.status(404).send("Page not found");
});

app.listen(8080, () => console.log("Server started"));
