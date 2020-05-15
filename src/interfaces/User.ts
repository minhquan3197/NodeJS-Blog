import { Post } from './Post'

export interface User {
    name: string
    username: boolean
    password: string
    posts: Array<Post>
}

export interface Login {
    username: string
    password: string
}

export interface Register {
    name: string
    passwordConfirmation: string
}

export interface ChangePassword {
    password: string
    oldPassword: string
    passwordConfirmation: string
}
