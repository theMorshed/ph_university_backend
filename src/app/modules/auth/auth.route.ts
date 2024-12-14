import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { authValidations } from "./auth.validation";
import { authControllers } from "./auth.controller";

const authRouter = Router();

authRouter.post('/login', validateRequest(authValidations.loginValidationSchema), authControllers.loginUser);

export const authRoutes = authRouter;