import { Types } from "mongoose";

export type TName = {
    firstName: string;
    middleName: string;
    lastName: string;
}

export type TBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type TGuardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
}

export type TLocalGuardian = {
    name: string;
    occupation: string;
    address: string;
    contactNo: string;
}

export type TStudent = {
    id: string;
    user: Types.ObjectId;
    name: TName;
    gender: 'male' | 'female';
    dob: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: TBloodGroup;
    presentAddress: string;
    permanentAddress: string;
    guardian: TGuardian;
    localGuardian: TLocalGuardian;
    admissionSemester: Types.ObjectId;
    academicDepartment: Types.ObjectId;
    profileImg: string;
    isDeleted: boolean;
}
