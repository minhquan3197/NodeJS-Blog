import { Post } from './Post';

export interface User {
    name: string;
    username: boolean;
    password: string;
    posts: Array<Post>;
}

export interface Login {
    username: string;
    password: string;
}

export interface Register {
    name: string;
    username: string;
    password: string;
    passwordConfirmation: string;
}

export interface ChangePassword {
    password: string;
    oldPassword: string;
    passwordConfirmation: string;
}
