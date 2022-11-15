const express = require('express')
const router = express.Router()
const ResList = require('../../model/res-list')

router.get("/new", (req, res) => {
    res.render("new");
  });
  
router.post("/", (req, res) => {
    return ResList.insertMany(req.body)
      .then(() => res.redirect("/"))
      .catch(error => console.log(error))
});
// detail
router.get("/:id", (req, res) => {
    const id = req.params.id;
    return ResList.findById(id)
      .lean()
      .then((restaurant) => res.render("detail", { restaurant }))
      .catch((error) => console.log(error));
});
  
// edit
router.get("/:id/edit", (req, res) => {
    const id = req.params.id;
    return ResList.findById(id)
      .lean()
      .then((restaurant) => res.render("edit", { restaurant }))
      .catch((error) => console.log(error));
});
  
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const edit = req.body;
    return ResList.findById(id)
      .then((restaurant) => {
        // use Object.assign
        restaurant = Object.assign(restaurant, edit)
        return restaurant.save();
      })
      .then(() => res.redirect(`/restaurants/${id}`))
      .catch((error) => console.log(error));
});
  
// delete
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    return ResList.findById(id)
      .then((restaurant) => restaurant.remove())
      .then(() => res.redirect("/"))
      .catch((error) => console.log(error));
});

module.exports = router