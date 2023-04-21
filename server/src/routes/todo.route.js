const Router = require('express');

const router = new Router();
const todoController = require('../controllers/todo.controller');

router.post('/todo', todoController.createToDo);
router.get('/todo', todoController.getAllToDo);
router.get('/todo/:id', todoController.getOneToDo);
router.put('/todo/:id', todoController.updateToDo);
router.delete('/todo', todoController.deleteToDo);

module.exports = router;
