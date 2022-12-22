const express = require("express");
const router = express.Router();
const User = require("../../model/users");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.render("register", {
      name,
      email,
      password,
      confirmPassword,
    });
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        console.log("email already exist.");
        return res.render("register", {
          name,
          email,
          password,
          confirmPassword,
        });
      } else {
        return User.create({
          name,
          email,
          password,
        }).then(() => {
          res.redirect("/users/login");
        });
      }
    })
    .catch((err) => console.log(err));
});
module.exports = router;
