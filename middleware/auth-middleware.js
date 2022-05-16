const tokenService = require('../service/token-service');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization
        console.log(authorizationHeader)

        if (!authorizationHeader) {
            return next(res.status (401));
        }
        const accessToken = authorizationHeader.split(';')[0]
        if (!accessToken) {
            return next(res.status (401));
        }
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(res.status (401));
        }
        req.user = userData;
        next();
    } catch (e) {
        return next(res.status (401));
    }
};