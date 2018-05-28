'use strict'

const Client = require('./lib/client')

exports.createClient = function (options) {
  return new Client(options)
}
