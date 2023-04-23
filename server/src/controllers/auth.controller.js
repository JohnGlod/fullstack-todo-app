const { validationResult } = require('express-validator');
const userService = require('../services/user.service');
const ApiError = require('../helpers/apiError');

class AuthController {
  async login(req, res, next) {
    try {
      const { login, password } = req.body;
      const userData = await userService.login(login, password);
      res.cookie('refreshToken', userData.refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async registration(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Validation error', errors.array()));
      }

      const { login, password, firstName, middleName, lastName } = req.body;

      const { managerId } = req.params;

      const userData = await userService.registration(
        login,
        password,
        firstName,
        middleName,
        lastName,
        managerId
      );

      res.cookie('refreshToken', userData.refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.status(200).json('Token deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);

      res.cookie('refreshToken', userData.refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
