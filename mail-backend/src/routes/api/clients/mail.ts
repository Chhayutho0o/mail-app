import express from "express";
import * as controller from "~/app/controllers/v1/api/mails";
import { userAuthMiddleware } from "~/middleware/auth";

require("express-async-errors");

const mailRouter = express.Router();

mailRouter.route("/").get(userAuthMiddleware, controller.list);
mailRouter.route("/:id").get(userAuthMiddleware, controller.detail);
mailRouter.route("/:id").patch(userAuthMiddleware, controller.moveTo);
mailRouter.route("/:id").delete(userAuthMiddleware, controller.destory);

export default mailRouter;
