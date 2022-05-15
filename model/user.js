const {Schema, model} = require ('mongoose')

const UserSchema = new Schema ({
    login:    {type: String, required: true, unique: true,},
    password: {type: String, required: true,}
}, {
    timestamp: true,
});

module.exports = model ('User', UserSchema);