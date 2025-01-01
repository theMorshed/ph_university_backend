import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { authValidations } from "./auth.validation";
import { authControllers } from "./auth.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post('/login', 
    validateRequest(authValidations.loginValidationSchema), 
    authControllers.loginUser
);

router.post('/change-password', 
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student), 
    validateRequest(authValidations.changePasswordValidationSchema), 
    authControllers.changePassword
);

router.post('/refresh-token', 
    validateRequest(authValidations.refreshTokenValidationSchema), 
    authControllers.refreshToken
);

router.post('/forget-password', 
    validateRequest(authValidations.forgetPasswordValidationSchema), 
    authControllers.forgetPassword
);

router.post('/reset-password', 
    validateRequest(authValidations.resetPasswordValidationSchema), 
    authControllers.resetPassword
);

export const authRoutes = router;