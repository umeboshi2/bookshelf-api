'use strict'
HowhapList = require('howhap-list')

module.exports = (req, res, urlPieces, model, config) ->
  list = new HowhapList(null, availableErrors: config.errors)
  model.set req.body
  model.save().then((savedModel) ->
    res.json savedModel.toJSON()
    return
  ).catch((err) ->
    list.add 'UNKNOWN', message: err.toString()
    res.status(400).json list.toObject()
    return
  ).then ->
    Promise.resolve
      urlPieces: urlPieces
      model: model
