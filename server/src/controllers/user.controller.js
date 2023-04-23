const userService = require('../services/user.service');

class UserController {
  async getAllUsers (req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async getMyAssigns (req, res, next) {
    try {
      const { id } = req.body;
      const employees = await userService.getMyEmployees(id);
      return res.json(employees);
    } catch (error) {
      next(error);
    }
  }

  async getUserById (req, res, next) {
    try {
      return res.json('getUserById');
    } catch (error) {
      next(error);
    }
  }

  async updateRoleUserById (req, res, next) {
    try {
      const { id } = req.params;
      const { managerId } = req.body;
      const employee = await userService.createMyEmployee(id, managerId);
      return res.json(employee);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser (req, res, next) { }
}

module.exports = new UserController();
