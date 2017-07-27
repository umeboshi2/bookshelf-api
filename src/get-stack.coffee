'use strict'

module.exports = ->
  orig = Error.prepareStackTrace

  Error.prepareStackTrace = (_, stack) ->
    stack

  err = new Error
  Error.captureStackTrace err
  stack = err.stack
  Error.prepareStackTrace = orig
  stack.shift()
  stack
