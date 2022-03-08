const express = require("express");
const app = express();
// Debug middleware
const debug = (req, res, next) => {
  console.log("Call from debug middleware");
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
app.get("/heros", (req, res) => {
  res.json(superHeros);
})

app.get("*", (_,res)=>{
  res.status(404).send("Page not found")
})
app.listen(8080, () => console.log("Server started"));