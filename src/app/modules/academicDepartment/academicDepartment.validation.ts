import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({invalid_type_error: 'Dapartment name must be a string', required_error: 'Department name is required'}),
        academicFaculty: z.string({required_error: 'Academic Faculty is required', invalid_type_error: 'Academic Faculty must be a string'})
    })
})

const updateAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({invalid_type_error: 'Dapartment name must be a string', required_error: 'Department name is required'}).optional(),
        academicFaculty: z.string({required_error: 'Academic Faculty is required', invalid_type_error: 'Academic Faculty must be a string'}).optional()
    })
})

export const AcademicDepartmentValidations = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema,
}