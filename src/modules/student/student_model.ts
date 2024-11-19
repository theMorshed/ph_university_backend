import { model, Schema } from "mongoose";
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
    id: {
        type: String,
        required: [true, "Id is required"],
        unique: true,
    },
    name: {
        type: nameSchema,
        required: [true, "Name is required"],
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'others'],
            message: '{VALUE} is not valid',
        },
        required: [true, "Gender is required"],
    },
    dob: {type: String, required: [true, "dob is required"]},
    email: {type: String, required: [true, "Email is required"], unique: true},
    contactNo: {type: String, required: [true, "ContactNo is required"]},
    emergencyContactNo: {type: String, required: true},
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: true,
    },
    presentAddress: {type: String, required: true},
    parmanentAddress: {type: String, required: true},
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImage: {type: String, required: true},
    isActive: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active',
    }
})

export const StudentModel = model<TStudent>('Student', studentSchema);