const express = require("express");
const app = express();
//routers
const usersRouter = require("./routers/usersRouter");

app.use(express.json());
// ROUTES
app.use("/", usersRouter);

app.use("*", (err, req, res, next) => {
  res.send("error");
});
app.listen(8080, () => console.log("Listen ..."));
