import { z } from "zod";

export const userValidationSchema = z.object({
    id: z.string(),
    password: z.string().max(20, {message: 'password must be less than 20 characters'}),
    needsPasswordChange: z.boolean().default(true).optional(),
    role: z.enum(['student', 'faculty', 'admin']),
    status: z.enum(['in-progress', 'blocked']).default('in-progress'),
    isDeleted: z.boolean().optional().default(false)
})