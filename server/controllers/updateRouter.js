const express = require('express')
const Entry= require('../models/Entry')
const updateRouter = express.Router()

// create new entry
updateRouter.post('/create', function (req, res) {
  try{
    Entry.create(req.body)
    res.sendStatus(201)
  } catch(err) {
    res.status(404).send(err.message);
  }
})


// delete entry 
updateRouter.post('/delete/:id', function (req, res) {
  try{
    Entry.deleteById(req.params.id)
    res.sendStatus(200)
  } catch(err) {
    res.status(404).send(err.message);
  }
})

module.exports = updateRouter;