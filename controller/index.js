const authService = require('../service/auth-service');
const {validationResult} = require('express-validator');

class Controller {

    index (req, res, next) {
        try {
            return next (res.status (200))
        } catch (e) {
            return next (res.status (401))
        }
    }

    async registration(req, res, next) {
        try {
            const data = req.body;
            const userData = await authService.registration(data);
            res.setHeader ('Authorization', userData.refreshToken)
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const data = req.body;
            const userData = await authService.login(data);
            res.setHeader ('Authorization', userData.refreshToken)
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
            res.setHeader ('Authorization', userData.refreshToken)
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