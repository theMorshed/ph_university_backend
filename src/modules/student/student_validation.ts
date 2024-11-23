import Joi from "joi";

// Joi student schema
// Sub-schema for Name
const nameValidationSchema = Joi.object({
    firstName: Joi.string()
        .trim()
        .regex(/^[A-Z][a-z]*$/)
        .required(),
    middleName: Joi.string().optional(),
    lastName: Joi.string()
        .trim()
        .regex(/^[A-Za-z]+$/)
        .required(),
});

// Sub-schema for Guardian
const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().trim().required(),
    fatherOccupation: Joi.string().trim().required(),
    fatherContactNo: Joi.string()
        .trim()
        .pattern(/^\d{10}$/)
        .required(),
    motherName: Joi.string().trim().required(),
    motherOccupation: Joi.string().trim().required(),
    motherContactNo: Joi.string()
        .trim()
        .pattern(/^\d{10}$/)
        .required(),
});

// Sub-schema for Local Guardian
const localGuardianValidationSchema = Joi.object({
    name: Joi.string().trim().required(),
    occupation: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
    contactNo: Joi.string()
        .trim()
        .pattern(/^\d{10}$/)
        .required(),
});

// Main Student Schema
const studentValidationSchema = Joi.object({
    id: Joi.string().trim().required(),
    name: nameValidationSchema.required(),
    gender: Joi.string()
        .valid("male", "female", "others")
        .required(),
    dob: Joi.date().iso().required(),
    email: Joi.string().email().required(),
    contactNo: Joi.string()
        .trim()
        .pattern(/^\d{10}$/)
        .required(),
    emergencyContactNo: Joi.string()
        .trim()
        .pattern(/^\d{10}$/)
        .required(),
    bloodGroup: Joi.string()
        .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
        .required(),
    presentAddress: Joi.string().trim().required(),
    parmanentAddress: Joi.string().trim().required(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImage: Joi.string().trim().required(),
    isActive: Joi.string().valid("active", "blocked").default("active"),
});

export default studentValidationSchema;