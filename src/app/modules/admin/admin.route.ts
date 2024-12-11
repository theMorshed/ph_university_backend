import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { adminControllers } from './admin.controller';
import { updateAdminValidationSchema } from './admin.validation';

const adminRouter = express.Router();

adminRouter.get('/', adminControllers.getAllAdmins);
adminRouter.get('/:id', adminControllers.getSingleAdmin);

adminRouter.patch(
    '/:id',
    validateRequest(updateAdminValidationSchema),
    adminControllers.updateAdmin,
);

adminRouter.delete('/:id', adminControllers.deleteAdmin);


export const adminRoutes = adminRouter;