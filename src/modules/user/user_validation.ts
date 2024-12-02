import { z } from "zod";

export const userValidationSchema = z.object({
    password: z.string().max(20, {message: 'password must be less than 20 characters'}).optional(),
})