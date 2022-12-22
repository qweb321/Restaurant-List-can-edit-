const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");

const router = require("./routes");
require("./config/mongoose");

const port = 3000;
const app = express();

app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

// 宣告express使用靜態css文件
app.use(express.static("./public"));

app.use(
  session({
    secret: "Thisismykey",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(router);

app.listen(port, () => {
  console.log(`app is ruuning on http://localhost:${port}`);
});
