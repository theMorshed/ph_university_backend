import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { authValidations } from "./auth.validation";
import { authControllers } from "./auth.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const authRouter = Router();

authRouter.post('/login', validateRequest(authValidations.loginValidationSchema), authControllers.loginUser);

authRouter.post('/change-password', auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student), validateRequest(authValidations.changePasswordValidationSchema), authControllers.changePassword);

authRouter.post('/refresh-token', validateRequest(authValidations.refreshTokenValidationSchema), authControllers.refreshToken);

export const authRoutes = authRouter;