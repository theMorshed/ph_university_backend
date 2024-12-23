/*
 * Importing necessary modules and components:
 * - `Router`: From Express, used to create and manage API routes.
 * - `academicFacultyControllers`: Controller methods for academic faculty logic.
 * - `validateRequest`: Middleware for validating incoming requests.
 * - `academicFacultyValidations`: Validation schemas for academic faculty routes.
 */
import { Router } from "express";
import { academicFacultyControllers } from "./academicFaculty.controller";
import validateRequest from "../../middlewares/validateRequest";
import { academicFacultyValidations } from "./academicFaculty.validation";

// Initializing the router for academic faculty routes
const router = Router();

/**
 * Route: POST /create-academic-faculty
 * Purpose: Create a new academic faculty.
 * Middleware: 
 *   - validateRequest: Validates the request body against the `createAcademicFacultyValidationSchema`.
 * Controller: `createAcademicFaculty` - Handles the creation logic.
 */
router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyValidations.createAcademicFacultyValidationSchema),
  academicFacultyControllers.createAcademicFaculty
);

/**
 * Route: GET /
 * Purpose: Retrieve all academic faculties.
 * Controller: `getAllAcademicFaculties` - Fetches and returns a list of all faculties.
 */
router.get('/', academicFacultyControllers.getAllAcademicFaculties);

/**
 * Route: GET /:facultyId
 * Purpose: Retrieve a single academic faculty by its ID.
 * Params:
 *   - facultyId: The unique identifier of the academic faculty.
 * Controller: `getSingleAcademicFaculty` - Fetches and returns the requested faculty.
 */
router.get('/:facultyId', academicFacultyControllers.getSingleAcademicFaculty);

/**
 * Route: PATCH /:facultyId
 * Purpose: Update an existing academic faculty by its ID.
 * Middleware: 
 *   - validateRequest: Validates the request body against the `updateAcademicFacultyValidationSchema`.
 * Params:
 *   - facultyId: The unique identifier of the academic faculty.
 * Controller: `updateAcademicFaculty` - Handles the update logic.
 */
router.patch(
  '/:facultyId',
  validateRequest(academicFacultyValidations.updateAcademicFacultyValidationSchema),
  academicFacultyControllers.updateAcademicFaculty
);

// Exporting the router for use in the main application file
export const academicFacultyRoutes = router;