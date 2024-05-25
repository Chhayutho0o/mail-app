import express from "express";
import * as controller from "~/app/controllers/v1/api/tags";
import { userAuthMiddleware } from "~/middleware/auth";

require("express-async-errors");

const tagRouter = express.Router();

tagRouter.route("/").get(userAuthMiddleware, controller.list);

export default tagRouter;
