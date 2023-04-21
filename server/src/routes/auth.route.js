const Router = require('express');
const { body } = require('express-validator');
const router = new Router();
const AuthController = require('../controllers/auth.controller');

router.post(
  '/registration',
  body('login').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  AuthController.registration
);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/refresh', AuthController.refresh);

module.exports = router;
