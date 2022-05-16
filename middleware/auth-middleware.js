const tokenService = require('../service/token-service');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.cookie.split('refreshToken=')[1]
        if (!authorizationHeader) {
            return next(res.status (401).redirect ('/api/login'));
        }
        const accessToken = authorizationHeader.split(';')[0]
        if (!accessToken) {
            return next(res.status (401).redirect ('/api/login'));
        }
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(res.status (401).redirect ('/api/login'));
        }
        req.user = userData;
        next();
    } catch (e) {
        return next(res.status (401).redirect ('/api/login'));
    }
};