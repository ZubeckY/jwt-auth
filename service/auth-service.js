const bcrypt = require('bcrypt');
const UserDto = require('../dtos/user-dto');
const tokenService = require('./token-service');
const UserModel = require('../model/user');

class authService {
    async registration (login, password) {
        const candidate = await UserModel.findOne ({login})
        if (candidate) {
            throw new Error (`Пользователь уже существует`)
        }
        const hashPassword = await bcrypt.hash (password, 3);

        const user = await UserModel.create ({login, password: hashPassword})

        const userDto = new UserDto (user);
        const tokens = tokenService.generateTokens ({...userDto});
        await tokenService.saveToken (userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }


    async login (login, password) {
        const user = await UserModel.findOne ({login})
        if (!user) {
            throw new Error ('Пользователь не найден')
        }
        const isPassEquals = await bcrypt.compare (password, user.password);
        if (!isPassEquals) {
            throw new Error ('Неверный пароль');
        }
        const userDto = new UserDto (user);
        const tokens = tokenService.generateTokens ({...userDto});

        await tokenService.saveToken (userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout (refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh (refreshToken) {
        if (!refreshToken) {
            throw new Error ('Не авторизован');
        }
        const userData = tokenService.validateRefreshToken (refreshToken);
        const tokenFromDb = await tokenService.findToken (refreshToken);
        if (!userData || !tokenFromDb) {
            throw new Error ('Не авторизован');
        }
        const user = await UserModel.findById (userData.id);
        const userDto = new UserDto (user);
        const tokens = tokenService.generateTokens ({...userDto});

        await tokenService.saveToken (userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }
}

module.exports = new authService();