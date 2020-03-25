export interface IAuthLogin {
    email: string;
    password: string;
}

export interface IAuthRegister {
    email: string;
    password: string;
    password_confirmation: string;
}

export interface IChangePassword {
    password: string;
    old_password: string;
    password_confirmation: string;
}
