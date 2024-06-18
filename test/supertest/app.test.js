import { expect } from "chai";
import supertest from "supertest";
import dao from "../../src/data/index.factory.js";
const { products, orders } = dao;

const requester = supertest("http://localhost:" + process.env.PORT + "/api");

describe("Testing API", () => {
  const productData = {
    title: "producto de test 6",
    stock: 50,
    price: 50,
  };
  const orderData = {
    product_id: "2493dfcdbfcbcac421d91c47",
    quantity: 2,
  };
  const user = {
    name: "premium",
    email: "premium@coder3.com",
    password: "hola1234",
    role: 2,
  };
  let uid;
  let pid;
  let oid;
  let token = {};

  before(async function () {
    this.timeout(5000);
    const response = await requester.post("/sessions/register").send(user);
    const { _body, statusCode } = response;
    expect(_body.statusCode).to.be.equal(201);
  });

  it("login", async function () {
    this.timeout(5000);
    const response = await requester.post("/sessions/login").send(user);
    const { _body, headers } = response;
    token.key = headers["set-cookie"][0].split("=")[0];
    token.value = headers["set-cookie"][0].split("=")[1];
    uid = _body.response.user._id;
    expect(_body.response.user).to.has.property("_id");
  });

  it("create product", async () => {
    const response = await requester
      .post("/products")
      .send(productData)
      .set("Cookie", [token.key + "=" + token.value]);
    pid = response._body.response._id;
    orderData.product_id = pid;
    expect(response._body.statusCode).to.be.equal(201);
  });

  it("read all products", async () => {
    const response = await requester
      .get("/products")
      .set("Cookie", [token.key + "=" + token.value]);
    expect(response._body.statusCode).to.be.equals(200);
  });

  it("read a product", async () => {
    const response = await requester.get("/products/" + pid);
    expect(response._body.statusCode).to.be.equals(200);
  });

  it("update a product", async () => {
    const response = await requester
      .put("/products/" + pid)
      .set("Cookie", [token.key + "=" + token.value])
      .send({ title: "producto actualizado" });
    expect(response._body.response.title).to.be.eqls("producto actualizado");
  });

  it("delete a product", async () => {
    const response = await requester
      .delete("/products/" + pid)
      .set("Cookie", [token.key + "=" + token.value]);
    expect(response._body.statusCode).to.be.equals(200);
  });

  it("create order", async () => {
    const response = await requester
      .post("/orders")
      .send(orderData)
      .set("Cookie", [token.key + "=" + token.value]);
    expect(response._body).to.have.property("response");
    oid = response._body.response._id;
    expect(response._body.statusCode).to.be.equal(201);
  });

  it("update order", async () => {
    const response = await requester
      .put("/orders/" + oid)
      .set("Cookie", [token.key + "=" + token.value])
      .send({ quantity: 3 });
    expect(response._body).to.have.property("response");
    expect(response._body.response.quantity).to.be.eqls(3);
  });

  it("delete order", async () => {
    const response = await requester
      .delete("/orders/" + oid)
      .set("Cookie", [token.key + "=" + token.value]);
    expect(response._body.statusCode).to.be.equals(200);
  });

  it("signout", async () => {
    const response = await requester
      .post("/sessions/signout")
      .set("Cookie", [token.key + "=" + token.value]);
    const { _body, statusCode } = response;
    expect(_body.statusCode).to.be.equals(200);
  });

  it("delete user", async () => {
    const response = await requester.delete("/users/" + uid);
    const { statusCode, _body } = response;
    expect(_body.statusCode).to.be.eqls(200);
  });
});
