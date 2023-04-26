const todoService = require('../services/todo.service');
class ToDoController {
  async createToDo (req, res, next) {
    try {
      const todo = req.body;
      const createdTodo = await todoService.createTodo(todo);
      res.json(createdTodo);
    } catch (error) {
      next(error);
    }
  }

  async updateToDo (req, res, next) {
    try {
      const todo = req.body;
      const { id } = req.params;
      const updatedTodo = await todoService.updateTodo(id, todo);
      res.json(updatedTodo);
    } catch (error) {
      next(error);
    }
  }

  async getManagerTodos (req, res, next) {
    try {
      const { id } = req.params;
      const todos = await todoService.getManagerTodos(id);
      res.json(todos);
    } catch (error) {
      next(error);
    }
  }

  async getEmployeeTodos (req, res, next) {
    try {
      const { id } = req.params;
      const todos = await todoService.getEmployeeTodos(id);
      res.json(todos);
    } catch (error) {
      next(error);
    }
  }

  async deleteToDo (req, res, next) {
    try {
      const { id } = req.params;
      const result = await todoService.deleteTodo(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getToDos (req, res, next) {
    try {
      const result = await todoService.getToDos();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ToDoController();
