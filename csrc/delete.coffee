'use strict'
HowhapList = require('howhap-list')

module.exports = (req, res, urlPieces, model, config) ->
  list = new HowhapList(null, availableErrors: config.errors)
  if urlPieces.length < 2
    list.add 'REQUIRES_ID', model: urlPieces[0]
    res.status(config.errors.REQUIRES_ID.status).json list.toObject()
    new Promise((resolve, reject) ->
      resolve
        urlPieces: urlPieces
        model: model
      return
)
  else
    result = {}
    result[model.idAttribute] = model.id
    promise = null
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
    if hasTimestamps.indexOf(config.deletedAttribute) >= 0 and (!req.hardDelete and !config.hardDelete or req.hardDelete == false)
      updatedData = {}
      updatedData[model.hasTimestamps[2]] = new Date
      promise = model.save(updatedData, method: 'update').then((savedModel) ->
        res.json result
        return
      )
    else
      promise = model.destroy(require: true).then((destroyedModel) ->
        res.json result
        return
      )
    promise.catch((err) ->
      status = 500
      if err.message == 'No Rows Updated' or err.message == 'No Rows Deleted'
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
