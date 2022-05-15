const Router = require('express')
const {body} = require ('express-validator');
const Controller =  require ('../controller/index')
const router = new Router ();

router.get  ('/refresh', Controller.refresh);
router.post ('/login', Controller.login);
router.post ('/logout', Controller.logout);
router.post ('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    Controller.registration
);