import { User } from './User'

export interface Post {
    name: string
    userId: User
}

export interface Posts extends Array<Post> {}
