const {Schema, model} = require ('mongoose')

const UserSchema = new Schema ({
    name: {type: String, required: true, unique: true,},
    director: {type: String, required: true, },
    phone: {type: String, required: true, unique: true,},
    email: {type: String, required: true, unique: true,},
    comment: {type: String, },
    contactname: {type: String, },
    contactphone: {type: String, },
    password: {type: String, required: true,}
}, {
    timestamps: true
});

module.exports = model ('User', UserSchema);