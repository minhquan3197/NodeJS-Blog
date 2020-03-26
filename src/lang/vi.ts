export const transValidation = {
    auth: {
        email_incorrect: 'Email phải có dạng example@company.domain !',
        password_incorrect:
            'Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt',
        password_confirmation_incorrect: 'Nhập lại mật khẩu chưa chính xác!',
        old_password_incorrect: 'Mật khẩu cũ không hợp lệ',
    },
    category: {
        name_incorrect: 'Độ dài tên không đủ',
        description_incorrect: 'Độ dài nội dung không đủ',
    },
    blog: {
        name_incorrect: 'Độ dài tên không đủ',
        content_incorrect: 'Độ dài nội dùng không đủ',
        image_incorrect: 'Độ dài ảnh không đủ',
        category_incorrect: 'Chưa chọn danh mục',
    },
};

export const transErrors = {
    system: {
        server_error:
            'Có lỗi ở phía server, vui lòng thông báo cho bộ phận hỗ trợ. Xin cám ơn.',
        object_id_invalid: 'Id không hợp lệ',
    },
    auth: {
        account_in_use: 'Email đã được đăng ký !',
        login_failed: 'Sai tài khoản hoặc mật khẩu !',
        user_current_password_failed: 'Mật khẩu hiện tại không đúng',
        account_undefined: 'Tài khoản không tồn tại',
    },
    user: {
        avatar_type: 'Kiểu file không hợp lệ.',
        avatar_size: 'Ảnh upload tối đa cho phép là 1 MB !',
        user_not_found: 'Tài khoản không tồn tại',
    },
    category: {
        not_found: 'Danh mục không tồn tại',
    },
    blog: {
        not_found: 'Bài viết không tồn tại',
    },
};

export const transSuccess = {
    user: {
        user_created: (userEmail: string) => {
            return `Tài khoản <strong>${userEmail}</strong> đã được tạo thành công`;
        },
        avatar_updated: 'Cập nhật thành công.',
        user_info_updated: 'Cập nhật thông tin người dùng thành công.',
    },
    category: {
        category_created: (name: string) => {
            return `Danh mục <strong>${name}</strong> đã được tạo thành công`;
        },
        category_updated: (name: string) => {
            return `Danh mục <strong>${name}</strong> đã được cập nhật thành công`;
        },
        category_deleted: (name: string) => {
            return `Xóa danh mục <strong>${name}</strong> thành công`;
        },
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
    auth: {
        login_success: (userEmail: string) => {
            return `Xin chào ${userEmail}, chúc bạn một ngày tốt lành.`;
        },
        logout_success: 'Đăng xuất tài khoản thành công, hẹn gặp lại bạn :)',
    },
};
