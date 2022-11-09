const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
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

app.get("/", (req, res) => {
  ResList.find()
    .lean()
    .then((restList) => {
      console.log(restList);
      return res.render("index", { restList });
    })
    .catch((error) => console.log(error));
});

app.listen(port, () => {
  console.log(`app is ruuning on http://localhost:${port}`);
});
