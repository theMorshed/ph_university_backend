import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin, USER_ROLE.faculty), FacultyControllers.getAllFaculties);
router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
    '/:id',
    validateRequest(updateFacultyValidationSchema),
    FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);


export const facultyRoutes = router;