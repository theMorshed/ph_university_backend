import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';

const facultyRouter = express.Router();

facultyRouter.get('/', FacultyControllers.getAllFaculties);
facultyRouter.get('/:id', FacultyControllers.getSingleFaculty);

facultyRouter.patch(
    '/:id',
    validateRequest(updateFacultyValidationSchema),
    FacultyControllers.updateFaculty,
);

facultyRouter.delete('/:id', FacultyControllers.deleteFaculty);


export const facultyRoutes = facultyRouter;