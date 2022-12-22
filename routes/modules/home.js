const express = require("express");
const router = express.Router();
const ResList = require("../../model/res-list");

router.get("/", (req, res) => {
  const sortValue = req.query.sort;
  const sort = sortValue ? { [sortValue]: true } : {};
  const sortOption = {
    "A-Z": { name: "asc" },
    "Z-A": { name: "desc" },
    catergory: { catergory: "asc" },
    location: { location: "asc" },
    rating: { rating: "desc" },
  };
  const keyword = req.query.keyword ? req.query.keyword : "";

  const userId = req.user._id;

  ResList.find({
    $and: [
      { userId },
      {
        $or: [
          { name: { $regex: keyword, $options: "$i" } }, // mongodb query selector
          { name_en: { $regex: keyword, $options: "$i" } },
          { category: { $regex: keyword, $options: "$i" } },
        ],
      },
    ],
  })
    .sort(sortOption[sortValue]) // Combine search and sort in the same form that can prevent page transferred when submitted
    .lean()
    .then((restList) => {
      // console.log(restList)
      res.render("index", { restList, sort, keyword });
    })
    .catch((error) => console.log(error));
});
module.exports = router;
