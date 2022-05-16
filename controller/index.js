const authService = require('../service/auth-service');
const {validationResult} = require('express-validator');

class Controller {
    async registration(req, res, next) {
        try {
            const {login, password} = req.body;
            const userData = await authService.registration(login, password);
            res.set ('Authorization', userData.refreshToken)
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {login, password} = req.body;
            const userData = await authService.login(login, password);
            res.set ('Authorization', userData.refreshToken)
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.headers.authorization;
            const token = await authService.logout(refreshToken);
            res.removeHeader ('Authorization')
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.headers.authorization;
            const userData = await authService.refresh(refreshToken);
            res.set ('Authorization', userData.refreshToken)
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }


    async getAll (req, res, next) {
        try {
            const users = await authService.getAll();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new Controller();