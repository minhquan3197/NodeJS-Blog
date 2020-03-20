"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transValidation = {
    auth: {
        email_incorrect: 'Email phải có dạng example@company.domain !',
        password_incorrect: 'Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt',
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
exports.transErrors = {
    system: {
        server_error: 'Có lỗi ở phía server, vui lòng thông báo cho bộ phận hỗ trợ. Xin cám ơn.',
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
    },
    category: {
        not_found: 'Danh mục không tồn tại',
    },
    blog: {
        not_found: 'Bài viết không tồn tại',
    },
};
exports.transSuccess = {
    user: {
        user_created: function (userEmail) {
            return "T\u00E0i kho\u1EA3n <strong>" + userEmail + "</strong> \u0111\u00E3 \u0111\u01B0\u1EE3c t\u1EA1o th\u00E0nh c\u00F4ng";
        },
        avatar_updated: 'Cập nhật thành công.',
        user_info_updated: 'Cập nhật thông tin người dùng thành công.',
    },
    category: {
        category_created: function (name) {
            return "Danh m\u1EE5c <strong>" + name + "</strong> \u0111\u00E3 \u0111\u01B0\u1EE3c t\u1EA1o th\u00E0nh c\u00F4ng";
        },
        category_updated: function (name) {
            return "Danh m\u1EE5c <strong>" + name + "</strong> \u0111\u00E3 \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt th\u00E0nh c\u00F4ng";
        },
        category_deleted: function (name) {
            return "X\u00F3a danh m\u1EE5c <strong>" + name + "</strong> th\u00E0nh c\u00F4ng";
        },
    },
    blog: {
        blog_created: function (name) {
            return "B\u00E0i vi\u1EBFt <strong>" + name + "</strong> \u0111\u00E3 \u0111\u01B0\u1EE3c t\u1EA1o th\u00E0nh c\u00F4ng";
        },
        blog_updated: function (name) {
            return "B\u00E0i vi\u1EBFt <strong>" + name + "</strong> \u0111\u00E3 \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt th\u00E0nh c\u00F4ng";
        },
        blog_deleted: function (name) {
            return "X\u00F3a b\u00E0i vi\u1EBFt <strong>" + name + "</strong> th\u00E0nh c\u00F4ng";
        },
    },
    auth: {
        login_success: function (userEmail) {
            return "Xin ch\u00E0o " + userEmail + ", ch\u00FAc b\u1EA1n m\u1ED9t ng\u00E0y t\u1ED1t l\u00E0nh.";
        },
        logout_success: 'Đăng xuất tài khoản thành công, hẹn gặp lại bạn :)',
    },
};
