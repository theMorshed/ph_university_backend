/* eslint-disable @typescript-eslint/no-unused-vars */
import { startSession } from "mongoose";
import { StudentModel } from "./student.model"
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import { userModel } from "../user/user.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { studentSearchableFields } from "./student.constant";

const getAllStudentsFromDB = async(query: Record<string, unknown>) => {
    /****************************
    const queryObj = {...query};
    let searchTerm = '';
    if (query?.searchTerm) {
        searchTerm = query.searchTerm as string;
    }

    const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];

    const searchQuery = StudentModel.find({
        $or: studentSearchableFields.map((field) => ({            
            [field]: {$regex: searchTerm, $options: 'i'},
        }))
    });

    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);

    const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty'
        }
    });

    let sort = '-createdAt';
    if (query.sort) {
        sort = query.sort as string;
    }
    const sortQuery = filterQuery.sort(sort);

    let limit = 1;
    if (query.limit) {
        limit = query.limit as number;
    }

    let page = 1;
    let skip = 0;

    if (query.page) {
        page = query.page as number;
        skip = (page - 1) * limit;
    }

    const paginateQuery = sortQuery.skip(skip);
    const limitQuery = paginateQuery.limit(limit);

    let fields = '-__v';
    if (query.fields) {
        fields = (query.fields as string).split(',').join(' ');
    }

    const fieldQuery = await limitQuery.select(fields);

    return fieldQuery;
    **********************/
   const studentQuery = new QueryBuilder(StudentModel.find()
    .populate('admissionSemester')
    .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
    }), query)
   .search(studentSearchableFields)
   .filter()
   .sort()
   .paginate()
   .fields()

   const result = await studentQuery.modelQuery;

   return result;
}

const getSingleStudentFromDB = async(id: string) => {
    const result = await StudentModel.findById(id).populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty'
        }
    });
    return result;
}

const deleteStudentFromDB = async (id: string) => {
    // Check if the student exists
    const studentExists = await StudentModel.isStudentExists(id);

    if (!studentExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Student does not exists');
    }

    const session = await startSession();

    try {
        session.startTransaction();

        const deletedStudent = await StudentModel.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true, session },
        );

        if (!deletedStudent) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete student');
        }

        const userId = deletedStudent.user;
        const deletedUser = await userModel.findByIdAndUpdate(
            userId,
            { isDeleted: true },
            { new: true, session },
        );

        if (!deletedUser) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete user');
        }

        await session.commitTransaction();
        await session.endSession();

        return deletedStudent;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error('Failed to delete student');
    }
};

export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
}