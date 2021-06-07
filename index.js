const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const PORT = 8080;
const bodyParser = require("body-parser");
// APP USES
app.use(cookieParser());
app.set("view engine", "pug");
app.use(express.urlencoded());
// TEST DATA

// ENDPOINTS
app.get("/home", (req, res) => {
  if (req.cookies.username) {
    res.status(200).render("home", { username: req.cookies.username });
  } else {
    res.status(200).send(`
    <h1>Not logged in</h1>
    <h2> <a href="/login">log in now</a> </h2>
    `);
  }
});
app.get("/", (req, res) => {
  res.status(200).send(`
  <h1>Welcome to Future</h1>
  <h5> visit <a href="/home">home</a> </h5>
  `);
});
app.get("/login", (req, res) => {
  if (req.cookies.username) {
    res.status(200).send(`
    <h2>Already logged in</h2>
    <h5> return to <a href="/home">home</a> </h5>
    `);
  } else {
    res.render("login", {
      title: "Future login page",
      msg: "Welcome to Future Login page",
    });
  }
});
app.post("/login", (req, res) => {
  res.cookie("username", req.body.username, { maxAge: 172800 }).send(`
    <h1>login successful</h1>
    <h2>return to <a href="/home">home</a></h2>`);
});
app.get("/logout", (req, res) => {
  res.clearCookie("username");
  res.send(`
  <h2>Successfully logged out</h2>
  <h5> return to <a href="/home">home</a> </h5>
  `);
});

// STARTING SERVER
app.listen(PORT, () => {
  console.log("listening on http://localhost:" + PORT);
});
