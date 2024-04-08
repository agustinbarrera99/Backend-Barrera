import OrderDTO from "../dto/orders.dto.js";
import dao from "../data/index.factory.js";
const { orders } = dao

class OrdersRep {
    constructor() {
        this.model = orders
    }
    create = async(data) => {
        data = new OrderDTO(data)
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
    update = async(id, data) => {
        const response = await this.model.update(id, data)
        return response
    }
    destroy = async(id) => {
        const response = await this.model.destroy(id)
        return response
    }
}

const repository = new OrdersRep()
export default repository
