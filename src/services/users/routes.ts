import { Router } from "express";
import { expressjwt } from "express-jwt";
import { config } from "../../config";
import * as controller from "./controller";

export const usersRoutes = (router: Router) => {
  /* GET /api/users */
  router.get('/', controller.find);

  /* GET /api/users/:userId */
  /* Authenticated route */
  router.get('/:userId',expressjwt(config), controller.get);

  /* POST /api/users */
  router.post('/', controller.create);

  /* PATCH /api/users/:userId */
  /* Authenticated route */
  router.patch('/:userId', expressjwt(config), controller.patch);
};
