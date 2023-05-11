class UserDTO {
    constructor(_id, first_name, last_name, email, age, password, role, cartId) {
        this._id = _id,
        this.first_name = first_name,
        this.last_name = last_name,
        this.email = email,
        this.role = role,
        this.age = age,
        this.password = password,
        this.cartId = cartId
    }
}
export default UserDTO