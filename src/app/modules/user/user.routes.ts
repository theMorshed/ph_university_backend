import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createAdminValidationSchema } from "../admin/admin.validation";
import { USER_ROLE } from "./user.constant";
import auth from "../../middlewares/auth";
import { changeStatusValidationSchema } from "./user.validation";
import { upload } from "../../utils/sendImageToCloudinary";
import { createStudentValidationSchema } from "../student/student.validation";

const router = Router();

router.post('/create-student', 
    auth(USER_ROLE.superAdmin, USER_ROLE.admin), 
    upload.single('file'), 
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    }, 
    validateRequest(createStudentValidationSchema), 
    userController.createStudent
);

router.post('/create-faculty', 
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    },
    validateRequest(createFacultyValidationSchema),
    userController.createFaculty
);

router.post('/create-admin', 
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    upload.single('file'), 
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    },
    validateRequest(createAdminValidationSchema), 
    userController.createAdmin
);

router.get('/me', 
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student), userController.getMe
);

router.patch('/change-status/:id', 
    auth(USER_ROLE.superAdmin, USER_ROLE.admin), 
    validateRequest(changeStatusValidationSchema), 
    userController.changeStatus
);

export const userRoutes = router;
