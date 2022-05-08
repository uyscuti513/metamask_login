import { Router } from "express";
import * as controller from "./controller";

const authRoutes = Router();

authRoutes.post("/", controller.create);

export default authRoutes;