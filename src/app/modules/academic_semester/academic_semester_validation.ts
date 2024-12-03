import { z } from "zod";
import { academicSemesterCode, academicSemesterName, Months } from "./academic_semester_constant";

const createAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum([...academicSemesterName] as [string, ...string[]]),
        year: z.string(),
        code: z.enum([...academicSemesterCode] as [string, ...string[]]),
        startMonth: z.enum([...Months] as [string, ...string[]]),
        endMonth: z.enum([...Months] as [string, ...string[]]),
    })
})

export const academicSemesterValidations = {
    createAcademicSemesterValidationSchema
}