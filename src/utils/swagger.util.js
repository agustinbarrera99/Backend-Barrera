import __dirname from "../../utils.js";

export const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Ecommerce api",
      description: "documentation of api"
    }
  },
  apis: [`${__dirname}/src/docs/*.yaml`]
}