export const transValidation = {
    auth: {
        username_incorrect: 'Username không hợp lệ',
        password_incorrect: 'Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt',
        password_confirmation_incorrect: 'Nhập lại mật khẩu chưa chính xác!',
        old_password_incorrect: 'Mật khẩu cũ không hợp lệ',
        name_incorrect: 'Tên không hợp lệ',
    },
    blog: {
        name_incorrect: 'Độ dài tên không đủ',
        content_incorrect: 'Độ dài nội dùng không đủ',
        image_incorrect: 'Độ dài ảnh không đủ',
    },
};

export const transErrors = {
    system: {
        server_error: 'Có lỗi ở phía server',
        object_id_invalid: 'Id không hợp lệ',
    },
    auth: {
        account_in_use: 'Username đã được đăng ký !',
        login_failed: 'Sai tài khoản hoặc mật khẩu !',
        user_current_password_failed: 'Mật khẩu hiện tại không đúng',
        account_undefined: 'Tài khoản không tồn tại',
        permission_error: 'Bạn không có quyền cho chức năng này',
    },
    user: {
        avatar_type: 'Kiểu file không hợp lệ.',
        avatar_size: 'Ảnh upload tối đa cho phép là 1 MB !',
        user_not_found: 'Tài khoản không tồn tại',
    },
    blog: {
        not_found: 'Bài viết không tồn tại',
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
