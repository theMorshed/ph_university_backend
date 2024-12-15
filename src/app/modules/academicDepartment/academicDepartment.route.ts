// Importing necessary modules
import { Router } from "express"; // For creating and managing routes.
import { academicDepartmentControllers } from "./academicDepartment.controller"; // Controller methods for handling academic department logic.
import validateRequest from "../../middlewares/validateRequest"; // Middleware to validate incoming requests.
import { AcademicDepartmentValidations } from "./academicDepartment.validation"; // Validation schemas for academic department routes.

// Initializing the router for academic department routes
const academicDepartmentRouter = Router();

/**
 * Route: POST /create-academic-department
 * Purpose: Create a new academic department.
 * Middleware: 
 *   - validateRequest: Validates the request body against the `createAcademicDepartmentValidationSchema`.
 * Controller: `createAcademicDepartment` - Handles the creation logic.
 */
academicDepartmentRouter.post(
  '/create-academic-department',
  validateRequest(AcademicDepartmentValidations.createAcademicDepartmentValidationSchema),
  academicDepartmentControllers.createAcademicDepartment
);

/**
 * Route: GET /
 * Purpose: Retrieve all academic departments.
 * Controller: `getAllAcademicDepartments` - Fetches and returns a list of all departments.
 */
academicDepartmentRouter.get('/', academicDepartmentControllers.getAllAcademicDepartments);

/**
 * Route: GET /:departmentId
 * Purpose: Retrieve a single academic department by its ID.
 * Params:
 *   - departmentId: The unique identifier of the academic department.
 * Controller: `getSingleAcademicDepartment` - Fetches and returns the requested department.
 */
academicDepartmentRouter.get('/:departmentId', academicDepartmentControllers.getSingleAcademicDepartment);

/**
 * Route: PATCH /:departmentId
 * Purpose: Update an existing academic department by its ID.
 * Middleware: 
 *   - validateRequest: Validates the request body against the `updateAcademicDepartmentValidationSchema`.
 * Params:
 *   - departmentId: The unique identifier of the academic department.
 * Controller: `updateAcademicDepartment` - Handles the update logic.
 */
academicDepartmentRouter.patch(
  '/:departmentId',
  validateRequest(AcademicDepartmentValidations.updateAcademicDepartmentValidationSchema),
  academicDepartmentControllers.updateAcademicDepartment
);

// Exporting the router for use in the main application file
export const academicDepartmentRoutes = academicDepartmentRouter;