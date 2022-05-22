const bcrypt = require('bcrypt');
const UserDto = require('../dtos/user-dto');
const tokenService = require('./token-service');
const UserModel = require('../model/user');

class authService {
    async registration (data) {
        let {name, director, phone, email, comment, contactname, contactphone, password} = data

        const Name = await UserModel.findOne ({name})
        if (Name) {
            throw new Error (`Организация уже зарегестрирована`)
        }
        const Phone = await UserModel.findOne ({phone})
        if (Phone) {
            throw new Error (`Данный Телефон уже привязан к другой организации`)
        }
        const Email = await UserModel.findOne ({email})
        if (Email) {
            throw new Error (`Данный Email уже привязан к другой организации`)
        }
        const hashPassword = await bcrypt.hash (password, 3);

        const user = await UserModel.create ({name, director, phone, email, comment, contactname, contactphone, password: hashPassword})
        const userDto = new UserDto (user);
        const tokens = tokenService.generateTokens ({...userDto});
        await tokenService.saveToken (userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }


    async login (data) {

        let {phone, password} = data
        const user = await UserModel.findOne ({phone})
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

    async getAll () {
        const users = await UserModel.find();
        return users;
    }
}

module.exports = new authService();