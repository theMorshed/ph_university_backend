import { Model, model, Schema } from "mongoose";
import { TName, TGuardian, TLocalGuardian, TStudent } from "./student_interface";
import validator from "validator";

const nameSchema = new Schema<TName>({
    firstName: {
        type: String,
        trim: true,
        required: [true, "First name is required"],
        validate: {
            validator: function (fname: string) {
                return fname === fname.charAt(0).toUpperCase() + fname.slice(1);
            },
            message: '{VALUE} must be in Capitalize format',
        }
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        validate: {
            validator: (lname: string) => validator.isAlpha(lname),
            message: "{VALUE} is not valid"
        }
    }
});

const guardianSchema = new Schema<TGuardian>({
    fatherName: {
        type: String,
        required: [true, "Father's name is required"],        
    },
    fatherOccupation: {
        type: String,
        required: [true, "Father's occupation is required"]
    },
    fatherContactNo: {
        type: String,
        required: [true, "Father's contact number is required"]
    },
    motherName: {
        type: String,
        required: [true, "Mother's name is required"]
    },
    motherOccupation: {
        type: String,
        required: [true, "Mother's occupation is required"]
    },
    motherContactNo: {
        type: String,
        required: [true, "Mother's contact number is required"]
    },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
    name: {
        type: String,
        required: [true, "Local guardian's name is required"]
    },
    occupation: {
        type: String,
        required: [true, "Local guardian's occupation is required"]
    },
    address: {
        type: String,
        required: [true, "Local guardian's address is required"]
    },
    contactNo: {
        type: String,
        required: [true, "Local guardian's contact number is required"]
    }
});

const studentSchema = new Schema<TStudent>({
    id: {
        type: String,
        required: [true, "Student ID is required"],
        unique: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, "User ID is required"],
        unique: true,
        ref: "User",
    },
    name: {
        type: nameSchema,
        required: [true, "Student name is required"],
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'others'],
            message: '{VALUE} is not a valid gender',
        },
        required: [true, "Gender is required"],
    },
    dob: {
        type: String,
        required: [true, "Date of birth is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    contactNo: {
        type: String,
        required: [true, "Contact number is required"]
    },
    emergencyContactNo: {
        type: String,
        required: [true, "Emergency contact number is required"]
    },
    bloodGroup: {
        type: String,
        enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            message: '{VALUE} is not a valid blood group'
        },
        required: [true, "Blood group is required"]
    },
    presentAddress: {
        type: String,
        required: [true, "Present address is required"]
    },
    permanentAddress: {
        type: String,
        required: [true, "Permanent address is required"]
    },
    guardian: {
        type: guardianSchema,
        required: [true, "Guardian information is required"]
    },
    localGuardian: {
        type: localGuardianSchema,
        required: [true, "Local guardian information is required"]
    },
    admissionSemester: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicSemester'
    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicDepartment'
    },
    profileImg: {
        type: String,
        required: [true, "Profile image is required"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

studentSchema.statics.isStudentExists = async function (id: string) {
    return await this.exists({ id });
};

export const StudentModel = model<TStudent, StudentModel>('Student', studentSchema);

// Extend the interface for the model to include the static method
interface StudentModel extends Model<TStudent> {
    isStudentExists(id: string): Promise<boolean>;
}


