const mogoose = require ('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema ({

    login: {String, required: true,},
    password: {String, required: true,},

}, {
    timestamp: true,    // Добавление даты регистрации
});

const user = mongoose.model('user', userSchema);
module.exports = user;