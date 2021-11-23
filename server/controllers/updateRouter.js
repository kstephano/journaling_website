const express = require('express')
const Entry= require('../models/Entry')
const updateRouter = express.Router()

// create new entry
updateRouter.post('/create', function (req, res) {
  try{
    Entry.create(req.body)
    res.sendStatus(204)
  } catch(err) {
    res.status(404).send(err.message);
  }
})

// add comment
updateRouter.post('/comments/:id', function(req, res) {
  try{
      Entry.addCommment(req.params.id, req.body)
      res.sendStatus(200)
  } catch(err) {
    res.status(404).send(err.message);
  }
})

// add emoji
updateRouter.post('/emojis/:id', function(req, res) {
  try{
    if(Entry.findById(req.params.id)) {
      Entry.addEmoji(req.params.id, req.body)
      res.sendStatus(200)
    }
    else
      throw new Error(`${req.params.id} does not exist`)
    
  } catch(err) {
    res.status(404).send(err.message);
  }
})

module.exports = updateRouter;