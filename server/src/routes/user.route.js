const Router = require('express');

const router = new Router();
const userController = require('../controllers/user.controller');

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getMyAssigns);
router.put('/users/:id', userController.updateRoleUserById);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
