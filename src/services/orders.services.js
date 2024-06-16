import repository from "../repositories/order.rep.js";

class OrdersService {
  constructor() {
    this.repository = repository;
  }

  create = async (data) => {
    const response = await this.repository.create(data);
    return response;
  };

  read = async ({ filter, options }) => {
    const response = await this.repository.read({ filter, options });
    return response;
  };

  readOne = async (id) => {
    const response = await this.repository.readOne(id);
    return response;
  };

  update = async (id, data) => {
    const response = await this.repository.update(id, data);
    return response;
  };

  destroy = async (id) => {
    const response = await this.repository.destroy(id);
    return response;
  };

  report = async (user_id) => {
    const response = await this.repository.report(user_id);
    return response;
  };
}

const service = new OrdersService();
export default service;
