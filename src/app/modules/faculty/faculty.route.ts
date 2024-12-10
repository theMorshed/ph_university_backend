import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';

const facultyRouter = express.Router();

facultyRouter.get('/:id', FacultyControllers.getSingleFaculty);

facultyRouter.patch(
    '/:id',
    validateRequest(updateFacultyValidationSchema),
    FacultyControllers.updateFaculty,
);

facultyRouter.delete('/:id', FacultyControllers.deleteFaculty);

facultyRouter.get('/', FacultyControllers.getAllFaculties);

export const facultyRoutes = facultyRouter;