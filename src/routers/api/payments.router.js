import CustomRouter from "../CustomRouter.js";
import { payment } from "../../controllers/payments.controller.js";

class PaymentsRouter extends CustomRouter {
    init() {
        this.create("/checkout", ["USER", "PREM"], payment)
    }
}

export default PaymentsRouter