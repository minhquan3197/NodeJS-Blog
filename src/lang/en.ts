export const transValidation = {
    auth: {
        username_incorrect: 'Username is incorrect',
        password_incorrect: 'Password is incorrect',
        password_confirmation_incorrect: 'Password confirmation is incorrect',
        old_password_incorrect: 'Old password is incorrect',
        name_incorrect: 'Name is incorrect',
    },
    blog: {
        name_incorrect: 'Name is incorrect',
        content_incorrect: 'Content is incorrect',
        image_incorrect: 'Image is incorrect',
    },
};

export const transErrors = {
    system: {
        server_error: 'Server error',
        object_id_invalid: 'Id is invalid',
    },
    auth: {
        account_in_use: 'Username already exists',
        login_failed: 'The username or password is incorrect',
        user_current_password_failed: 'Password is incorrect',
        account_undefined: 'Username is not found',
        permission_error: 'You not have permission',
    },
    user: {
        user_not_found: 'User is not found',
    },
    blog: {
        not_found: 'Blog is not found',
    },
};

export const transSuccess = {
    system: {
        success: 'Ok',
    },
    user: {
        user_created: (username: string) => {
            return `Tài khoản <strong>${username}</strong> đã được tạo thành công`;
        },
        avatar_updated: 'Cập nhật thành công.',
        user_info_updated: 'Cập nhật thông tin người dùng thành công.',
    },
    auth: {
        login_success: (username: string) => {
            return `Xin chào ${username}, chúc bạn một ngày tốt lành.`;
        },
        logout_success: 'Đăng xuất tài khoản thành công, hẹn gặp lại bạn :)',
    },
    blog: {
        blog_created: (name: string) => {
            return `Bài viết <strong>${name}</strong> đã được tạo thành công`;
        },
        blog_updated: (name: string) => {
            return `Bài viết <strong>${name}</strong> đã được cập nhật thành công`;
        },
        blog_deleted: (name: string) => {
            return `Xóa bài viết <strong>${name}</strong> thành công`;
        },
    },
};
