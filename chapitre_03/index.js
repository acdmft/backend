const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "public/uploads" });
const fs = require("fs");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(express.static("public"));
app.use(cors({origin: "http://localhost:3000"}));

// USERS
const users = [];

app.post("/user", upload.single("image"), (req, res) => {
  fs.renameSync(
    req.file.path,
    path.join(req.file.destination, req.file.originalname)
  );
  users.push({username: req.body.name, image: req.file.destination + "/" + req.file.originalname});
  res.json({ message: "Image received", users });
});
app.get("/users", (req, res)=>{
  res.json(users);
})
app.listen(8001, () => console.log("Listen 8001..."));
