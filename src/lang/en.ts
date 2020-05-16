export const transValidation = {
    auth: {
        usernameIncorrect: 'Username is incorrect',
        passwordIncorrect: 'Password is incorrect',
        passwordConfirmationIncorrect: 'Password confirmation is incorrect',
        oldPasswordIncorrect: 'Old password is incorrect',
        nameIncorrect: 'Name is incorrect',
    },
    post: {
        nameIncorrect: 'Name is incorrect',
        userIncorrect: 'User is incorrect',
    },
};

export const transErrors = {
    system: {
        serverError: 'Server error',
        objectIdInvalid: 'Id is invalid',
        responseEmpty: 'Response is empty',
    },
    auth: {
        accountInUse: 'Username already exists',
        loginFailed: 'The username or password is incorrect',
        userCurrentPasswordFailed: 'Password is incorrect',
        accountUndefined: 'Username is not found',
        permissionError: 'You not have permission',
    },
    user: {
        notFound: 'User is not found',
    },
    post: {
        notFound: 'Post is not found',
    },
};

export const transSuccess = {
    system: {
        success: 'Ok',
    },
    user: {
        userCreated: (username: string) => {
            return `Account ${username} created successfully`;
        },
        userPasswordUpdated: 'Password updated successfully',
    },
    auth: {
        loginSuccess: (username: string) => {
            return `Hello ${username}, have a good day`;
        },
    },
    post: {
        postCreated: (name: string) => {
            return `Post ${name} created successfully`;
        },
        postUpdated: (name: string) => {
            return `Post ${name} updated successfully`;
        },
        postDeleted: (name: string) => {
            return `Post ${name} removed successfully`;
        },
    },
};
