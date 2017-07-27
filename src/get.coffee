'use strict'
HowhapList = require('howhap-list')
asyncfun = require 'asyncawait/async'
awaitfun = require 'asyncawait/await'

module.exports = asyncfun (req, res, urlPieces, model, config) ->
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
  # FIXME is there a better way than a collection/model flag?
  fetchCollection = undefined
  # Get individual record
  if urlPieces.length > 1
    fetchCollection = false
    promise = promise.fetch(fetchParams)
  else
    fetchCollection = true
    if req.query
      # Columns support
      if req.query.columns
        fetchParams.columns = req.query.columns
      # Where clause support
      if req.query.where
        if Array.isArray(req.query.where)
          promise = promise.where.apply(promise, req.query.where)
        else if Object::toString.call(req.query.where) == '[object Object]'
          promise = promise.where(req.query.where)
      # distinct column support
      if req.query.distinct
        promise = promise.query('distinct', req.query.distinct)
      # we need to get a total count and include that in response
      # with collection "{total:count(), items:[]}"
      # before setting offset and limit
      totalClone = promise.clone()
      # with pg we need to also add group by
      if req.query.distinct
        totalClone = totalClone.query 'groupBy', req.query.distinct
      total = awaitfun totalClone.count()

      # Order by support (needed for offset)
      if req.query.sort or req.query.offset
        direction = req.query.direction or 'ASC'
        direction = direction.toLowerCase()
        if Array.isArray req.query.sort
          orderExpression = []
          req.query.sort.forEach (col) ->
            orderExpression.push "#{col} #{direction}"
          promise = promise.query('orderByRaw', orderExpression.join(', '))
        else
          promise = promise.query('orderBy', req.query.sort, direction)
      # Offset support
      if req.query.offset
        #promise = promise.query((qb) -> qb.offset(req.query.offset))
        promise = promise.query('offset', req.query.offset)
      # Limit support
      if req.query.limit
        #promise = promise.query((qb) -> qb.limit(req.query.limit))
        promise = promise.query('limit', req.query.limit)
    promise = promise.fetchAll(fetchParams)
  promise.then((results) ->
    if !results
      list.add 'RECORD_NOT_FOUND',
        model: urlPieces[0]
        id: urlPieces[1]
      res.status(config.errors.RECORD_NOT_FOUND.status).json list.toObject()
    else
      if fetchCollection
        data =
          total: total
          items: results.toJSON()
      else
        data = results.toJSON()
      res.json data
    return
  ).catch((err) ->
    list.add 'RECORD_NOT_FOUND', error: err.toString()
    res.status(config.errors.UNKNOWN.status).json list.toObject()
    return
  ).then ->
    Promise.resolve
      urlPieces: urlPieces
      model: model
