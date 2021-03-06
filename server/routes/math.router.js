const express = require("express");
const pool = require("../modules/pool");
require("dotenv").config();
const router = express.Router();

//adds equations entered on the DOM to the database
router.post("/add", (req, res) => {
  //turns SQL statement into a variable
  const queryText = `INSERT INTO equations (equation, result) VALUES ($1, $2)`;
  pool
    .query(queryText, [req.body.input, req.body.result])
    .then((result) => {
      console.log("added new equation to the database", req.body);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error adding equation to database", error);
      res.sendStatus(500);
    });
});

//retrieves most recent 10 equations from database
router.get("/equations", (req, res) => {
  const queryText = `SELECT * FROM equations ORDER BY id DESC LIMIT 10`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error in server side equations GET", error);
      res.sendStatus(500);
    });
});

module.exports = router;
