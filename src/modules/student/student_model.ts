import { Schema } from "mongoose";
import { TName, TGuardian, TLocalGuardian, TStudent } from "./student_interface";

const nameSchema = new Schema<TName>({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    }
})

const guardianSchema = new Schema<TGuardian>({
    fatherName: {
        type: String,
        required: true
    },
    fatherOccupation: {
        type: String,
        required: true
    },
    fatherContactNo: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    motherOccupation: {
        type: String,
        required: true
    },
    motherContactNo: {
        type: String,
        required: true
    },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
    name: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    }
})

const studentSchema = new Schema<TStudent>({
    id: {type: String},
    name: nameSchema,
    gender: ['male', 'female'],
    dob: {type: String, required: true},
    email: {type: String, required: true},
    contactNo: {type: String, required: true},
    emergencyContactNo: {type: String, required: true},
    bloodGroup: {type: String},
    presentAddress: {type: String, required: true},
    parmanentAddress: {type: String, required: true},
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImage: {type: String, required: true},
    isActive: ['active', 'blocked']
})