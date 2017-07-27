'use strict'
HowhapList = require('howhap-list')

module.exports = (req, res, urlPieces, model, config) ->
  list = new HowhapList(null, availableErrors: config.errors)
  if config.putBehavior and config.putBehavior.toLowerCase() == 'update' and urlPieces.length < 2
    list.add 'REQUIRES_ID', model: urlPieces[0]
    res.status(config.errors.REQUIRES_ID.status).json list.toObject()
    new Promise((resolve, reject) ->
      resolve
        urlPieces: urlPieces
        model: model
      return
)
  else
    options = {}
    if config.putBehavior and config.putBehavior.toLowerCase() == 'update'
      options.method = 'update'
    promise = model
    hasTimestamps = null
    if model.hasTimestamps == false
      hasTimestamps = []
    else
      hasTimestamps = model.hasTimestamps
    if typeof hasTimestamps == 'boolean'
      hasTimestamps = [
        'created_at'
        'updated_at'
      ]
    if hasTimestamps.indexOf(config.deletedAttribute) >= 0
      promise = promise.where(config.deletedAttribute, null)
    promise.save(req.body, options).then((savedModel) ->
      res.json savedModel.toJSON()
      return
    ).catch((err) ->
      status = 500
      if err.message == 'No Rows Updated'
        list.add 'RECORD_NOT_FOUND',
          model: urlPieces[0]
          id: urlPieces[1]
        status = config.errors.RECORD_NOT_FOUND.status
      else
        list.add 'UNKNOWN', error: err.toString()
        status = config.errors.UNKNOWN.status
      res.status(status).json list.toObject()
      return
    ).then ->
      Promise.resolve
        urlPieces: urlPieces
        model: model
