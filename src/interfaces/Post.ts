export interface Post {
    name: string;
    userId: string;
}

export interface Posts extends Array<Post> {}
