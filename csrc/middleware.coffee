'use strict'
_ = require('lodash')
get = require('./get')
post = require('./post')
put = require('./put')
del = require('./delete')
url = require('url')
path = require('path')

module.exports = (models, config) ->

  middleware = (req, res, next) ->
    parsed = url.parse(_.trim(req.originalUrl, path.sep))
    urlPieces = parsed.pathname.split(path.sep)
    method = req.method.toLowerCase()

    error = (message) ->
      if next and _.isFunction(next)
        next()
      Promise.reject error: message

    if !urlPieces.length
      return error('Unknown path')
    modelName = null
    modelId = null
    # Named model
    if this and @modelName
      modelName = @modelName.toLowerCase()
      if req.params and req.params.id
        modelId = req.params.id
    else if !models.hasOwnProperty(urlPieces[urlPieces.length - 1].toLowerCase())
      if urlPieces.length < 2 or !models.hasOwnProperty(urlPieces[urlPieces.length - 2].toLowerCase())
        return error('No match')
      else
        modelName = urlPieces[urlPieces.length - 2].toLowerCase()
        modelId = urlPieces[urlPieces.length - 1]
    else
      modelName = urlPieces[urlPieces.length - 1].toLowerCase()
    filteredUrlPieces = [ modelName ]
    Model = models[modelName]
    model = new Model
    if modelId != null
      params = {}
      params[model.idAttribute] = modelId
      model = Model.forge(params)
      filteredUrlPieces.push modelId
    if method == 'get'
      return get(req, res, filteredUrlPieces, model, config)
    else if method == 'post'
      return post(req, res, filteredUrlPieces, model, config)
    else if method == 'put'
      return put(req, res, filteredUrlPieces, model, config)
    else if method == 'delete'
      return del(req, res, filteredUrlPieces, model, config)
    return

  (req, res, next) ->
    # Specifically calling out a named model
    if typeof req == 'string'
      return middleware.bind(modelName: req)
    middleware req, res, next
