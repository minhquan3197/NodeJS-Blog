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
        userIncorrect: 'Category is incorrect',
    },
}

export const transErrors = {
    system: {
        serverError: 'Server error',
        objectIdInvalid: 'Id is invalid',
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
        notFound: 'Blog is not found',
    },
}

export const transSuccess = {
    system: {
        success: 'Ok',
    },
    user: {
        userCreated: (username: string) => {
            return `Account ${username} created successfully`
        },
        userPasswordUpdated: 'Password updated successfully',
    },
    auth: {
        loginSuccess: (username: string) => {
            return `Hello ${username}, have a good day`
        },
    },
    blog: {
        blogCreated: (name: string) => {
            return `Blog ${name} created successfully`
        },
        blogUpdated: (name: string) => {
            return `Blog ${name} updated successfully`
        },
        blogDeleted: (name: string) => {
            return `Blog ${name} removed successfully`
        },
    },
}
