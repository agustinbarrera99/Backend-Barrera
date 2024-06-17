import { service } from "../services/payments.services.js"

class PaymentsController {
    constructor() {
        this.service = service
    }
    payment = async (req, res, next) => {
        try {
            return res.json({response: req.user._id})
        } catch (error) {
            next(error)
        }
    }
}

const controller = new PaymentsController()
export const { payment } = controller