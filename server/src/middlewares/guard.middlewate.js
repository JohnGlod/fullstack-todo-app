'use strict'
const ApiError = require('../helpers/apiError')
const tokenService = require('../services/token.service')

module.exports = function (req, res, next) {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      return next(ApiError.unauthorizedError())
    }
    const accessToken = authorization.split(' ')[1]
    if (!accessToken) {
      return next(ApiError.unauthorizedError())
    }
    const userData = tokenService.validateAccessToken(accessToken)
    if (!userData) {
      return next(ApiError.unauthorizedError())
    }
    req.user = userData
    next()
  } catch (error) {
    return next(ApiError.unauthorizedError())
  }
}
