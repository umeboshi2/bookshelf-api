'use strict'
HowhapList = require('howhap-list')

module.exports = (req, res, urlPieces, model, config) ->
  promise = model
  list = new HowhapList(null, availableErrors: config.errors)
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
  if hasTimestamps.indexOf(config.deletedAttribute) != -1
    promise = promise.where(config.deletedAttribute, null)
  fetchParams = {}
  if req.query and Array.isArray(req.query.withRelated)
    fetchParams.withRelated = req.query.withRelated
  # Get individual record
  if urlPieces.length > 1
    promise = promise.fetch(fetchParams)
  else
    if req.query
      # Where clause support
      if req.query.where
        if Array.isArray(req.query.where)
          promise = promise.where.apply(promise, req.query.where)
        else if Object::toString.call(req.query.where) == '[object Object]'
          promise = promise.where(req.query.where)
      # Order by support
      if req.query.sort
        direction = req.query.direction or 'ASC'
        direction = direction.toLowerCase()
        promise = promise.query('orderBy', req.query.sort, direction)
      # Limit support
      # Offset support
    promise = promise.fetchAll(fetchParams)
  promise.then((results) ->
    if !results
      list.add 'RECORD_NOT_FOUND',
        model: urlPieces[0]
        id: urlPieces[1]
      res.status(config.errors.RECORD_NOT_FOUND.status).json list.toObject()
    else
      res.json results.toJSON()
    return
  ).catch((err) ->
    list.add 'RECORD_NOT_FOUND', error: err.toString()
    res.status(config.errors.UNKNOWN.status).json list.toObject()
    return
  ).then ->
    Promise.resolve
      urlPieces: urlPieces
      model: model
