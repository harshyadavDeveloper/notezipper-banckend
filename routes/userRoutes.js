const express = require('express');
const userController = require('../controllers/userController');
const validate = require('../middlewares/validate-middleware');
const { signUpSchema, loginSchema } = require('../validators/auth-validators');

const router = express.Router();

router.route('/register').post(validate(signUpSchema),userController.registerUser);
router.route('/login').post(validate(loginSchema),userController.loginUser);
router.route('/details').get(userController.user);
router.put('/update').put(userController.updateUser); 

module.exports = router;
