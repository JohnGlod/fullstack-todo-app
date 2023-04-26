const Router = require('express');

const router = new Router();
const todoController = require('../controllers/todo.controller');
const guardMiddlewate = require('../middlewares/guard.middlewate');

router.get('/todos', todoController.getToDos, guardMiddlewate);

router.post('/todos', todoController.createToDo, guardMiddlewate);
router.get('/todos/:id', todoController.getManagerTodos, guardMiddlewate);
router.put('/todos/:id', todoController.updateToDo, guardMiddlewate);
router.delete('/todo/:id', todoController.deleteToDo, guardMiddlewate);

module.exports = router;
