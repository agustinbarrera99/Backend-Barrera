// import service from "../services/comments.services.js";

// class CommentsController {
//   constructor() {
//     this.service = service;
//   }
//   create = async (req, res, next) => {
//     try {
//       const data = req.body;
//       data.user_id = req.user._id
//       const one = await this.service.create(data);
//       return res.succes201(one);
//     } catch (error) {
//       return next(error);
//     }
//   };
//   read = async (req, res, next) => {
//     try {
//       const options = {
//         limit: req.query.limit || 20,
//         page: req.query.page || 1,
//         sort: { title: 1 },
//         lean: true,
//       };
//       const filter = {};
//       if (req.query.event_id) {
//         filter.event_id = req.query.event_id;
//       }
//       if (req.query.sort === "desc") {
//         options.sort.title = "desc";
//       }
//       const all = await this.service.read({ filter, options });
//       return res.success200(all);
//     } catch (error) {
//       return next(error);
//     }
//   };
//   readOne = async (req, res, next) => {
//     try {
//       const { cid } = req.params;
//       const one = await this.service.readOne(cid);
//       return res.success200(one);
//     } catch (error) {
//       return next(error);
//     }
//   };
//   update = async (req, res, next) => {
//     try {
//       const { cid } = req.params;
//       const data = req.body;
//       const one = await this.service.update(cid, data);
//       return res.success200(one);
//     } catch (error) {
//       return next(error);
//     }
//   };
//   destroy = async (req, res, next) => {
//     try {
//       const { cid } = req.params;
//       const one = await this.service.destroy(cid);
//       return res.success200(one);
//     } catch (error) {
//       return next(error);
//     }
//   };
// }

// export default CommentsController

// const controller = new CommentsController()

// export const { create, read, readOne, update, destroy } = controller