import UserDTO from "../dto/users.dto.js";
import dao from "../data/index.factory.js";
const { users } = dao

class UsersRep {
    constructor() {
        this.model = users
    }
    create = async(data) => {
        data = new UserDTO(data)
        const response = await this.model.create(data)
        return response
    }
    read = async() => {
        const response = await this.model.read({filter, options})
        return response
    }
    readOne = async(id) => {
        const response = await this.model.readOne(id)
        return response
    }
    readByEmail = async(email) => {
        const response = await this.model.readByEmail(email)
        return response
    }
    update = async(id, data) => {
        const response = await this.model.update(id, data)
        return response
    }
    destroy = async(id) => {
        const response = await this.model.destroy(id)
        return response
    }
}

const repository = new UsersRep()
export default repository
