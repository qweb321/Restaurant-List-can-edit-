const express = require('express')
const router = express.Router()
const ResList = require('../../model/res-list')

router.get("/", (req, res) => {
    ResList.find()
      .lean()
      .then((restList) => res.render("index", { restList }))
      .catch((error) => console.log(error));
  });

  module.exports = router