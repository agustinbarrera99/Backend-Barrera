import { faker } from "@faker-js/faker";
import repository from "../../repositories/product.rep.js";
import "dotenv/config.js"
import logger from "../../utils/logger/index.js";

function productMock() {
  return {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    stock: faker.number.int(),
  };
}

export const createProduct = async () => {
  try {
    await repository.create(productMock())
  } catch (error) {
    logger.ERROR(error.message);
  }
}

for (let i = 1; i <= 100; i++) {
  createProduct()
}

logger.INFO("data mocked")