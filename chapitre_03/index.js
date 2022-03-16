const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "public/uploads" });
const fs = require("fs");
const path = require("path");

app.use(express.json());
app.use(express.static("public"));

// USERS
const users = [];

app.post("/user", upload.single("image"), (req, res) => {
  fs.renameSync(
    req.file.path,
    path.join(req.file.destination, req.file.originalname)
  );
  users.push(req.body.name);
  res.json({ message: "Image received", users });
});

app.listen(8001, () => console.log("Listen 8001..."));
