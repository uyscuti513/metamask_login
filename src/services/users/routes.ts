import { Router } from "express";
import { expressjwt } from "express-jwt";
import { config } from "../../config";
import * as controller from "./controller";

const usersRoutes = Router();

usersRoutes.get("/", controller.findAdress);
usersRoutes.post('/', controller.create);

/* GET /api/users/:userId */
/* Authenticated route */
usersRoutes.get("/:userId", expressjwt(config), controller.get);

/* PATCH /api/users/:userId */
/* Authenticated route */
usersRoutes.patch("/:userId", expressjwt(config), controller.patch);

export default usersRoutes;
