const Router = require('express');

const router = new Router();
const todoController = require('../controllers/todo.controller');

router.get('/todos', todoController.getToDos);

router.post('/todos', todoController.createToDo);
router.get('/todos/manager/:id', todoController.getManagerTodos);
router.get('/todos/employee/:id', todoController.getEmployeeTodos);
router.put('/todos/:id', todoController.updateToDo);
router.delete('/todo/:id', todoController.deleteToDo);

module.exports = router;
