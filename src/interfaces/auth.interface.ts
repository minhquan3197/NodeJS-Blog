export interface IAuthLoginInput {
    username: string;
    password: string;
}

export interface IAuthRegisterInput {
    name: string;
    username: string;
    password: string;
    password_confirmation: string;
}

export interface IChangePasswordInput {
    password: string;
    old_password: string;
    password_confirmation: string;
}
