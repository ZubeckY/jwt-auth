module.exports = class UserDto {
    id; name; phone;
    constructor(model) {
        this.id = model._id;
        this.name = model.name;
        this.phone = model.phone;
    }
}