import config from "../config";
import { USER_ROLE } from "../modules/user/user.constant";
import { User } from "../modules/user/user.model";

const superAdmin = {
    id: '0001',
    email: 'themorshedctg@gmail.com',
    password: config.super_admin_password,
    needsPasswordChange: false,
    role: USER_ROLE.superAdmin,
    status: 'in-progress',
    isDeleted: false
};

const seedSuperAdmin = async() => {
    // check super admin existance
    const isSuperAdminExists = await User.findOne({ role: USER_ROLE.superAdmin });
    if (!isSuperAdminExists) {
        await User.create(superAdmin);
    }
}

export default seedSuperAdmin;