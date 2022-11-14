# Restaurant List

This project provide user can search restaurant list by name or category, add new restaurant and edit or delete it .

## Table of contents

- [Overview](#Overview)
- [Installation](#Installation)
- [Built with](#built-with)
- [Author](#author)

## Overview

Users should be able to:

- View the restaurant users like
- Search restaurant details, like category, phone number, address and rate
- Search by restaurant name or category
- Add new restaurant users like
- Edit or delete restaurant
- Sort restaurant list to quickly find the one you want

## Installation

1. Before start, make sure you already install Express and npm

```
git clone https://github.com/qweb321/Restaurant-List-can-edit-.git
```

2. In local side, run npm install
3. After installation finished, create an `.env` file and insert the code

```
MONGODB_URI =
  "mongodb+srv://(your mongodb account):(password)@cluster0.w9mfqtb.mongodb.net/(My mongodb)?retryWrites=true&w=majority"
```

4. Run code to create database

```
node model/seeds/res-listSeeder.js
```

5. After creating database done, run

```
npm run start
```

6. If terminal show the sentence below, means run successfully and click the url

```
app is listening in http://localhost:3000
```

7. If you want to stop

```
ctrl + C
```

## Built with

- Node.js
- Express
- Express-Handlebars
- Javascript
- Body-parser
- Dotenv
- Mongoose
- Bootstrap

## Author

- Website - [Isis Lin](https://github.com/qweb321)
