const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const usePassport = require("./config/password");
const router = require("./routes");

require("./config/mongoose");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = 3000;
const app = express();

app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

// 宣告express使用靜態css文件
app.use(express.static("./public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

usePassport(app);
app.use(flash());

app.use((req, res, next) => {
  // 把req的資料回傳給res
  res.locals.isAuthenticated = req.isAuthenticated;
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});
app.use(router);

app.listen(port, () => {
  console.log(`app is ruuning on http://localhost:${port}/user/login`);
});
