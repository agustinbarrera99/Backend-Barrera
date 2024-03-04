import { Router } from "express";

export default class CustomRouter {
  constructor() {
    this.router = Router(),
    this.init();
  }

  getRouter() {
    return this.router
  }
  init() {}

  applyCbs(cbs) {
    return cbs.map(cb => async(...params) => {
      try {
        await cb.apply(this, params)
      } catch (error) {
        params[1].json({
          statusCode: 500,
          message: error.message
        })
      }
    })
  }
  
  responses = (req, res, next) => {
    res.success200 = (payload) => {
      return res.json({
        statusCode: 200, 
        response: payload
      })
    }
    res.success201 = (payload) => {
      return res.json({
        statusCode: 200, 
        response: payload
      })
    }
    res.error400 = (message) => {
      return res.json({
        statusCode: 400,
        message
      })
    }
    res.error401 = () => {
      return res.json({
        statusCode: 401,
        message: "Bad Auth!"
      })
    }
    res.error403 = () => {
      return res.json({
        statusCode: 403,
        message: "Forbidden!"
      })
    }
    res.error404 = () => {
      return res.json({
        statusCode: 404,
        message: "Not Found!"
      })
    }
    return next()
  }

  create(path, ...cbs){
    this.router.post(path, this.responses, this.applyCbs(cbs))
  }
  read(path, ...cbs) {
    this.router.get(path, this.responses, this.applyCbs(cbs))
  }
  update(path, ...cbs) {
    this.router.put(path, this.responses, this.applyCbs(cbs))
  }
  destroy(path, ...cbs) {
    this.router.delete(path, this.responses, this.applyCbs(cbs))
  }
  use(path, ...cbs) {
    this.router.use(path, this.responses, this.applyCbs(cbs))
  }

}
