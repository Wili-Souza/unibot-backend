const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
require("./config/db");

const user = require("./routes/user");
const questions = require("./routes/questions");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/questions", questions);
app.use("/users", user);

app.listen(process.env.PORT || 3000, () => {
  console.log("Running on port 3000.");
});
