import repository from "../repositories/payments.rep.js";

class PaymentsService {
  constructor() {
    this.repository = repository;
  }
  payment = async (filter) => {
    try {
      const response = await this.repository.payment(filter);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export const service = new PaymentsService();