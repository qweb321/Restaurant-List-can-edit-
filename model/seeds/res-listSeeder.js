const db = require("../../config/mongoose");
const bcrypt = require("bcryptjs");
const ResList = require("../res-list");
const User = require("../users");
const restaurantList = require("./restaurant.json");

const SEEDER_USER = {
  1: {
    name: "user1",
    email: "user1@example.com",
    password: "12345678",
  },
  2: {
    name: "user2",
    email: "user2@example.com",
    password: "12345678",
  },
};

db.once("open", () => {
  const list = restaurantList.results;
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEEDER_USER[1].password, salt))
    .then((hash) =>
      User.create({
        name: SEEDER_USER[1].name,
        email: SEEDER_USER[1].email,
        password: hash,
      }).then((user) => {
        const userId = user._id;
        return Promise.all(
          Array.from({ length: 3 }, (_, i) =>
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
              userId: userId,
            })
          )
        );
      })
    );

  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEEDER_USER[2].password, salt))
    .then((hash) =>
      User.create({
        name: SEEDER_USER[2].name,
        email: SEEDER_USER[2].email,
        password: hash,
      })
    )
    .then((user) => {
      const userId = user._id;
      const list2 = list.slice(3);
      return Promise.all(
        Array.from({ length: 3 }, (v, i) =>
          ResList.create({
            id: list2[i].id,
            name: list2[i].name,
            name_en: list2[i].name_en,
            category: list2[i].category,
            image: list2[i].image,
            location: list2[i].location,
            phone: list2[i].phone,
            google_map: list2[i].google_map,
            rating: list2[i].rating,
            description: list2[i].description,
            userId: userId,
          })
        )
      ).then(() => {
        console.log("done!");
        process.exit();
      });
    });
});
