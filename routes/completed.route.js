const express = require('express');
const router = express.Router();
const {ObjectID} = require('mongodb');
const {TodoModel} = require('../models/todo.model')

router.get("/", async (req, res) => {
  const docs = await TodoModel
    .find({})
    .exec();
  res.json(docs);
});

module.exports = router;