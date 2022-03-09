const express = require("express");
const app = express();
//routers
const usersRouter = require("./routers/usersRouter");

app.use(express.json());




// ROUTES
app.use("/", usersRouter);

// GET USER BY NAME
app.get("/users/:name", (req, res) => {
  const user = users.find((user) => {
    return (
      user.name.replace(" ", "-").toLowerCase() ===
      req.params.name.replace(" ", "-").toLowerCase()
    );
  });
  if (!user) {
    return res.send("User not found");
  }
  res.json(user);
});

app.use("*", (err, req, res, next) => {
  res.send("error");
});
app.listen(8080, () => console.log("Listen ..."));
