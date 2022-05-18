const Router = require('express').Router;
const {body} = require('express-validator');
const Controller = require('../controller/index');
const authMiddleware = require('../middleware/auth-middleware');
const router = new Router();


router.get  ('/api/', authMiddleware, Controller.index)
router.get  ('/api/get-all', authMiddleware,  Controller.getAll)
router.get  ('/api/auth/refresh', Controller.refresh);
router.post ('/api/auth/login',  Controller.login);
router.post ('/api/auth/logout', Controller.logout);
router.post ('/api/auth/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    Controller.registration
);

module.exports = router