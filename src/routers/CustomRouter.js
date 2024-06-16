import { Router } from "express";
import jwt from "jsonwebtoken";
import dao from "../data/index.factory.js";
import errors from "../utils/errors/errors.js";

const { users } = dao

export default class CustomRouter {
  constructor() {
    (this.router = Router()), this.init();
  }

  getRouter() {
    return this.router;
  }
  init() {}

  applyCbs(cbs) {
    return cbs.map((cb) => async (...params) => {
      try {
        await cb.apply(this, params);
      } catch (error) {
        params[1].json({
          statusCode: 500,
          message: error.message,
        });
      }
    });
  }

  responses = (req, res, next) => {
    res.success200 = (payload) => {
      return res.json({
        statusCode: 200,
        response: payload,
      });
    };
    res.success201 = (payload) => {
      return res.json({
        statusCode: 201,
        response: payload,
      });
    };
    res.error400 = (message) => res.json(errors.message(message))
    res.error401 = () => res.json(errors.badAuth)
    res.error403 = () => res.json(errors.forbidden)
    res.error404 = () => res.json(errors.notFound)
    return next();
  };

  policies = (arrayOfPolicies) => async (req, res, next) => {
    try {
      let token = req.cookies["token"];
      if (token) {
        const data = jwt.verify(token, process.env.SECRET);
        if (data) {
          const { email, role } = data;
          const user = await users.readByEmail(email);
          req.user = user;
        }
      }
  
      if (arrayOfPolicies.includes("PUBLIC")) return next();
  
      if (!token) return res.error401();
  
      const data = jwt.verify(token, process.env.SECRET);
      if (!data) return res.error400("Bad auth by token!");
  
      const { email, role } = data;
      if (
        (role === 0 && arrayOfPolicies.includes("USER")) ||
        (role === 1 && arrayOfPolicies.includes("ADMIN")) ||
        (role === 2 && arrayOfPolicies.includes("PREM"))
      ) {
        const user = await users.readByEmail(email);
        req.user = user;
        return next();
      } else {
        return res.error403();
      }
    } catch (error) {
      return next(error);
    }
  };
  

  create(path, policies,...cbs) {
    this.router.post(path, this.responses, this.policies(policies), this.applyCbs(cbs));
  }
  read(path, policies, ...cbs) {
    this.router.get(path, this.responses, this.policies(policies) , this.applyCbs(cbs));
  }
  update(path, policies, ...cbs) {
    this.router.put(path, this.responses, this.policies(policies),this.applyCbs(cbs));
  }
  destroy(path, policies, ...cbs) {
    this.router.delete(path, this.responses, this.policies(policies) ,this.applyCbs(cbs));
  }
  use(path, ...cbs) {
    this.router.use(path, this.responses, this.applyCbs(cbs));
  }
}
