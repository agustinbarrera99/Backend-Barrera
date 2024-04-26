import { Router } from "express";

const productsFormRouter = Router();

productsFormRouter.get("/",(req, res, next) => {
  try {
    const user = req.cookies.token ? verifyToken(req.cookies.token) : null;
    console.log(user);

    const r = (u) => {
      if (u && u.role === 0) {
        return { usuarioComun: true, admin: false };
      } else if (u && u.role === 1) {
        return { usuarioComun: false, admin: true };
      } else {
        return { usuarioComun: false, admin: false };
      }
    };

    return res.render("formProduct", {
      user: user,
      usuarioComun: r(user),
      admin: r(user),
    });
  } catch (error) {
    next(error);
  }
});

export default productsFormRouter;
