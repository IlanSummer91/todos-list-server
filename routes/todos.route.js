const express = require('express');
const router = express.Router();
const {ObjectID} = require('mongodb');
const {TodoModel} = require('../models/todo.model')

router.route("/toggleAll")
  .patch(async (req, res) => {
    const todos = await TodoModel.find({}).exec();
    const isCompleted = todos.every(todo => todo.completed);
    const docs = await TodoModel
      .updateMany({},{$set: {completed: !isCompleted}})
      .exec();
    res.json(docs);
})

router.route("/active")
.get(async (req, res) => {
  const docs = await TodoModel
    .find({completed: false})
    .exec();
  res.json(docs);
})

router.route("/completed")
  .get(async (req, res) => {
    const docs = await TodoModel
      .find({completed: true})
      .exec();
    res.json(docs);
  })
  .delete(async (req, res) => {
    const docs = await TodoModel
      .deleteMany({completed: true})
      .exec();
    res.json(docs);
  })

router.route("/:id")
  .get(async (req, res) => {
    const docs = await TodoModel
      .findById(req.params.id)
      .exec();
    res.json(docs);
  })
  .delete(async (req, res) => {
    const docs = await TodoModel
      .findOneAndDelete({_id: ObjectID.createFromHexString(req.params.id)})
      .exec();
    res.json({success: docs ? true : false});
  })
  .patch(async (req, res) => {
    const docs = await TodoModel
      .findByIdAndUpdate(ObjectID.createFromHexString(req.params.id), req.body, {new: true})
      .exec();
    res.json(docs);
  })

router.route("/")
  .get(async (req, res) => {
    const docs = await TodoModel
      .find({})
      .exec();
    res.json(docs);
  })
  .post(async (req, res) => {
    const docs = await TodoModel
      .create(req.body);
    res.json(docs);
  })

module.exports = router;