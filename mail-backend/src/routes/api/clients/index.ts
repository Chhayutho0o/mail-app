import express from "express";
import userAuthRouter from "./auth";
import accountRouter from "./accounts";
import mailRouter from "./mail";
import tagRouter from "./tags";

require("express-async-errors");

export const routes = express.Router();

routes.use("/account", accountRouter);
routes.use("/auth", userAuthRouter);
routes.use("/mails", mailRouter);
routes.use("/tags", tagRouter);
