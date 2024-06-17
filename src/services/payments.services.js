import repository from "../repositories/payments.rep.js"

class PaymentsService {
    constructor() {
        this.repository = repository
    }
    payment = async() => {
        const response = await this.repository()
        return response
    } 
}

export const service = new PaymentsService()

export const { payment } = service