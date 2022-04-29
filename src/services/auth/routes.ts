import { Router } from "express";
import * as controller from "./controller";

export const authRoutes = (router: Router) => {
  /** POST /api/auth */
  router.post("/", controller.create);
};
