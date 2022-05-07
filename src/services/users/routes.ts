import { Router } from "express";
import { expressjwt } from "express-jwt";
import { config } from "../../config";
import * as controller from "./controller";

const usersRoutes = Router();

usersRoutes.get("/", controller.findByAddress);
usersRoutes.post('/', controller.createUser);

/* JWT Authenticated route */
usersRoutes.get("/:userId", /* expressjwt(config), */ controller.get);

/* JWT Authenticated route */
usersRoutes.patch("/:userId", /* expressjwt(config), */ controller.patch);

export default usersRoutes;
