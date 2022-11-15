const express = require('express')
const router = express.Router()
const ResList = require('../../model/res-list')

router.get("/", (req, res) => {
    const sortValue = req.query.sort
    const sortOption = {
      'A-Z': {name: 'asc'},
      'Z-A': {name: 'desc'},
      'catergory': {catergory: 'asc'},
      'location': {location: 'asc'},
      'rating': {rating: 'desc'}
    }
    const sort = sortValue ? { [sortValue]:true } : {}

    ResList.find()
      .lean()
      .sort(sortOption[sortValue])
      .collation( {locale: 'zh_Hant'} )
      .then((restList) => {
        res.render("index", { restList, sort})
      })
      .catch((error) => console.log(error));
  });

router.get('/search', (req, res) => {
    const keyword = req.query.keyword.trim().toLowerCase()
    ResList.find()
      .lean()
      .then((restList) => {
        const searchList = restList.filter((rest) => { 
          return rest.name.toLowerCase().includes(keyword) || 
            rest.name_en.toLowerCase().includes(keyword) ||
            rest.category.toLowerCase().includes(keyword)
        })
  
        if(!searchList.length) {
          return res.render("cannot_found", { keyword })
        }
        res.render("index", { restList: searchList, keyword})
      })
      .catch(error => console.log(error))
  }) 
  module.exports = router