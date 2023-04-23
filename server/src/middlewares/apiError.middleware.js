'use strict'
const ApiError = require('../helpers/apiError')

module.exports = function (err, req, res, next) {
  console.log(err, 'err')
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors })
  }
  return res.status(500).json({ message: 'Unexpected error' })
}