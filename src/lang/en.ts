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
        category_incorrect: 'Category is incorrect',
    },
    category: {
        name_incorrect: 'Name is incorrect',
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
    category: {
        not_found: 'Category is not found',
    },
};

export const transSuccess = {
    system: {
        success: 'Ok',
    },
    user: {
        user_created: (username: string) => {
            return `Account ${username} created successfully`;
        },
        user_password_updated: 'Password updated successfully',
    },
    auth: {
        login_success: (username: string) => {
            return `Hello ${username}, have a good day`;
        },
    },
    blog: {
        blog_created: (name: string) => {
            return `Blog ${name} created successfully`;
        },
        blog_updated: (name: string) => {
            return `Blog ${name} updated successfully`;
        },
        blog_deleted: (name: string) => {
            return `Blog ${name} removed successfully`;
        },
    },
    category: {
        category_created: (name: string) => {
            return `Category ${name} created successfully`;
        },
        category_updated: (name: string) => {
            return `Category ${name} updated successfully`;
        },
        category_deleted: (name: string) => {
            return `Category ${name} removed successfully`;
        },
    },
};
