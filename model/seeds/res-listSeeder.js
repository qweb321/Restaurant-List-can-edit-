const db = require('../../config/mongoose')
const ResList = require("../res-list");
const restaurantList = require("./restaurant.json");

db.once("open", () => {
  const list = restaurantList.results;
  for (let i = 0; i < list.length; i++) {
    ResList.create({
      id: list[i].id,
      name: list[i].name,
      name_en: list[i].name_en,
      category: list[i].category,
      image: list[i].image,
      location: list[i].location,
      phone: list[i].phone,
      google_map: list[i].google_map,
      rating: list[i].rating,
      description: list[i].description,
    });
  }

  console.log("done");
});
