const express = require("express");
const app = express();
// DEBUG MIDDLEWARE
const debug = (req, res, next) => {
  console.log("Call from debug middleware");
  next();
}
// transformName MIDDLEWARE
const transformName = (req, res, next) => {
  if (req.body.name) {
    req.body.name = req.body.name.toLowerCase();
  }
  next();
}

app.use(debug);
app.use(express.json());

const superHeros = 
[
  {
      name: "Iron Man",
      power: ["money"],
      color: "red",
      isAlive: true,
      age: 46,
      image: "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart"
  },
  {
      name: "Thor",
      power: ["electricity", "worthy"],
      color: "blue",
      isAlive: true,
      age: 300,
      image: "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg"
  },
  {
      name: "Daredevil",
      power: ["blind"],
      color: "red",
      isAlive: false,
      age: 30,
      image: "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg"
  }
]
// GET all heroes
app.get("/heroes", (req, res) => {
  res.json(superHeros);
});
// GET hero by his name 
app.get("/heroes/:name", (req, res) => {
  const hero = superHeros.find((hero) => { 
    return hero.name === req.params.name;
  });
  res.json(hero);
});
// GET the powers of hero 
app.get("/heroes/:name/powers", (req, res) => {
  const hero = superHeros.find((hero) => {
    return hero.name === req.params.name;
  });
  res.json(hero.power)
})
// POST A HERO
app.post("/heroes", transformName, (req, res) => {
  superHeros.push(req.body);
  res.json(superHeros[superHeros.length-1]);
})
// PATCH A HERO'S POWERS
app.patch("/heroes/:name/powers", (req, res) => {
  const hero = superHeros.find((hero)=> {
    return hero.name === req.params.name;
  });
  hero.power.push(req.body.power);
  res.json(hero);
})
// 404 PAGE
app.get("*", (_,res)=>{
  res.status(404).send("Page not found")
});

app.listen(8080, () => console.log("Server started"));