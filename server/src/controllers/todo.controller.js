class ToDoController {
  async createToDo (req, res, next) {
    return res.json('createToDo');
  }

  async updateToDo (req, res, next) {
    return res.json('updateToDo');
  }

  async getOneToDo (req, res, next) {
    return res.json('getOneToDo');
  }

  async getAllToDo (req, res, next) {
    return res.json('getAllToDo');
  }

  async deleteToDo (req, res, next) {
    return res.json('deleteToDo');
  }
}

module.exports = new ToDoController();
