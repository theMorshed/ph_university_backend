import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { adminServices } from './admin.service';

const getSingleAdmin = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await adminServices.getSingleAdminFromDB( id );

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Admin is retrieved succesfully',
        data: result,
    });
});

const getAllAdmins = catchAsync(async (req, res) => {
    const result = await adminServices.getAllAdminsFromDB(req.query);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Admins are retrieved succesfully',
        meta: result.meta,
        data: result.result,
    });
});

const updateAdmin = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { admin } = req.body;
    const result = await adminServices.updateAdminIntoDB( id , admin);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Admin is updated succesfully',
        data: result,
    });
});

const deleteAdmin = catchAsync(async (req, res) => {
    const {  id } = req.params;
    const result = await adminServices.deleteAdminFromDB(id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Admin is deleted succesfully',
        data: result,
    });
});

export const adminControllers = {
    getAllAdmins,
    getSingleAdmin,
    deleteAdmin,
    updateAdmin,
};