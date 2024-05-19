import { expect } from "chai";
import supertest from "supertest";
import dao from "../../src/data/index.factory.js";
const { products } = dao;

const requester = supertest("http://localhost:" + process.env.PORT + "/api");

describe("Testing API", () => {
  const productData = {
    title: "producto de test 4",
    stock: 50,
    price: 50,
  };
  const user = {
    name: "admin",
    email: "admin@coder.com",
    password: "hola1234",
    role: 1,
  };
  let uid;
  let pid;
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
