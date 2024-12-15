/*
 * Importing necessary modules and components:
 * - `Router`: From Express, used to create and manage API routes.
 * - `academicDepartmentControllers`: Controller methods for academic department logic.
 * - `validateRequest`: Middleware for validating incoming requests.
 * - `AcademicDepartmentValidations`: Validation schemas for academic department routes.
 */
import { Router } from "express";
import { academicDepartmentControllers } from "./academicDepartment.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicDepartmentValidations } from "./academicDepartment.validation";


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