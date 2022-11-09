const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ResList = require("./model/res-list");
const port = 3000;
const app = express();

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  console.log("mongodb connected!");
});

app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  ResList.find()
    .lean()
    .then((restList) => res.render("index", { restList }))
    .catch((error) => console.log(error));
});

// detail
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  return ResList.findById(id)
    .lean()
    .then((restaurant) => res.render("detail", { restaurant }))
    .catch((error) => console.log(error));
});

// edit
app.get("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id;
  return ResList.findById(id)
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => console.log(error));
});

app.post("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id;
  const edit = req.body;
  return ResList.findById(id)
    .then((restaurant) => {
      restaurant.name = edit.name;
      restaurant.name_en = edit.name_en;
      restaurant.phone = edit.phone;
      restaurant.location = edit.location;
      restaurant.category = edit.category;
      restaurant.description = edit.description;
      return restaurant.save();
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error));
});

app.listen(port, () => {
  console.log(`app is ruuning on http://localhost:${port}`);
});
