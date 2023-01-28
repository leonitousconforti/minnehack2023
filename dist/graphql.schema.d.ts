export declare class NewPost {
    title: string;
    text: string;
}
export declare class UpdatePost {
    id: string;
    title?: Nullable<string>;
    text?: Nullable<string>;
    isPublished?: Nullable<boolean>;
}
export declare class Post {
    id: string;
    title: string;
    text: string;
    isPublished: boolean;
}
export declare abstract class IQuery {
    abstract posts(): Post[] | Promise<Post[]>;
    abstract post(id: string): Nullable<Post> | Promise<Nullable<Post>>;
}
export declare abstract class IMutation {
    abstract createPost(input: NewPost): Post | Promise<Post>;
    abstract updatePost(input: UpdatePost): Nullable<Post> | Promise<Nullable<Post>>;
    abstract deletePost(id: string): Nullable<Post> | Promise<Nullable<Post>>;
}
export declare abstract class ISubscription {
    abstract postCreated(): Nullable<Post> | Promise<Nullable<Post>>;
}
declare type Nullable<T> = T | null;
export {};
