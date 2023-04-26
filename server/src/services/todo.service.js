const ToDo = require('../models/todo.model');
class TodoService {
  async createTodo (todo) {
    const createdTodo = await ToDo.create(todo);
    return createdTodo;
  }

  async getManagerTodos (managerId) {
    return await ToDo.findAll({ where: { createdBy: managerId } });
  }

  async getEmployeeTodos (employId) {
    return await ToDo.findAll({ where: { createdBy: employId } });
  }

  async updateTodo (id, body) {
    return await ToDo.update(
      body,
      {
        where: {
          id
        }
      }
    )
  }

  async deleteTodo (id) {
    return await ToDo.destroy({
      where: {
        id
      }
    });
  }

  async getToDos () {
    return await ToDo.findAll();
  }
}

module.exports = new TodoService();
