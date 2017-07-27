'use strict'
_ = require('lodash')
path = require('path')
fs = require('fs')
Howhap = require('howhap')
errors = require('./errors')
getStack = require('./get-stack')
pluralize = require('pluralize')

module.exports = (config) ->
  if !_.isObject(config)
    throw new Howhap(errors.BAD_CONFIG)
  defaultConfig =
    putBehavior: 'upsert'
    hardDelete: false
    deletedAttribute: 'deletedAt'
    errors: errors
    pluralEndpoints: false
  config = _.extend(defaultConfig, config)
  if !config.models
    if !config.path
      throw new Howhap(config.errors.MISSING_PATH)
    originalPath = config.path
    # Relative path
    if !path.isAbsolute(config.path)
      stack = getStack()
      stack.shift()
      callingFilePath = stack.shift().getFileName()
      config.path = path.join(path.dirname(callingFilePath), config.path)
    files = null
    try
      files = fs.readdirSync(config.path)
    catch e
      if e.code == 'ENOENT'
        throw new Howhap(config.errors.BAD_PATH, path: originalPath)
      throw new Howhap(config.errors.UNKNOWN, error: e.toString())
    models = files.filter((file) ->
      # Ignore non-javascript files and hidden files.
      path.extname(file) == '.js' and file.charAt(0) != '.'
    ).map((file) ->
      modelName = file.split('.')[0]
      {
        model: require(path.join(config.path, file))
        name: if config.pluralEndpoints then pluralize(modelName) else modelName
      }
    ).reduce(((before, info) ->
      before[info.name.toLowerCase()] = info.model
      before
    ), {})
  else
    models = config.models
  require('./middleware') models, config
