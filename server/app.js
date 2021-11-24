const dotenv = require("dotenv");
const express = require("express");
const app = express();
dotenv.config({ path: "./config.env" });
require("./db/conn");
app.use(express.json());

app.use(require("./router/auth"));
//const Users = require("./model/userscema");
const PORT = process.env.PORT;

app.get("/contact", (req, res) => {
  res.send("Contact  page");
});
app.get("/signin", (req, res) => {
  res.send("login page");
});
app.get("/signup", (req, res) => {
  res.send("register page");
});
app.listen(PORT, () => {
  console.log(`server is running on ${PORT} port`);
});
