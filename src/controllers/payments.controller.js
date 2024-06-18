import { service } from "../services/payments.services.js";

class PaymentsController {
    constructor() {
        this.service = service;
    }
    payment = async (req, res, next) => {
        try {
            const { _id } = req.user;
            const response = await this.service.payment({ user_id: _id });
            return res.success200(response);
        } catch (error) {
            next(error);
        }
    }
}

const controller = new PaymentsController();
export const { payment } = controller;