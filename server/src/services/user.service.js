const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const TokenService = require('./token.service');
const UserDto = require('../dtos/user.dto');
const ApiError = require('../helpers/apiError');

class UserService {
  async registration (login, password, firstName, middleName, lastName) {
    const candidate = await User.findOne({ where: { login } });
    if (candidate) {
      throw ApiError.badRequest(`User ${login} already exists`);
    }
    const hashPassword = await bcrypt.hash(password, 8);
    const user = await User.create({
      login,
      password: hashPassword,
      firstName,
      lastName,
      middleName
    });
    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(user.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto
    };
  }

  async login (login, password) {
    const user = await User.findOne({ where: { login } });
    if (!user) {
      throw ApiError.badRequest(`User ${login} not found`);
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.badRequest('Invalid password');
    }
    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(user.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto
    };
  }

  async logout (refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh (refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.unauthorizedError();
    }
    const user = await User.findOne({ where: { id: userData.id } });
    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(user.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto
    };
  }

  async getAllUsers () {
    const users = await User.findAll();
    return users;
  }

  async createMyEmployee (userId, managerId) {
    const user = await User.findOne({ where: { managerId: null, id: userId } });

    if (!user) {
      throw ApiError.badRequest('This user is already your subordinate');
    }
    user.managerId = managerId;
    await user.save();
    return user;
  }

  async getMyEmployees (id) {
    if (!id) {
      throw ApiError.badRequest('User id is required');
    }
    const users = await User.findAll({ where: { menagerId: id } });
    return users;
  }
}

module.exports = new UserService();
