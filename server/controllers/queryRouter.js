const express = require('express')
const Entry = require('../models/entry')
const queryRouter = express.Router()

const response = (data) => { return { entries: data } }

// get all entries
queryRouter.get('/all', function (req, res) {
  try{
    res.json(response(Entry.all))
  } catch(err) {
    res.status(404).send(err.message);
  }
})

// search by id
queryRouter.get('/:id', function (req, res) {
  try{
    let entry = Entry.findById(req.params.id)
    if(entry)
      res.json({ entry: entry })
    else
      throw new Error("Entry not found")
  } catch(err) {
    res.status(404).send(err.message)
  }
})

module.exports = queryRouter;