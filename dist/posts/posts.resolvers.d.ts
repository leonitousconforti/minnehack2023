import { PostsService } from "./posts.service";
import { Post, NewPost, UpdatePost } from "src/graphql.schema";
export declare class PostsResolvers {
    private readonly postService;
    constructor(postService: PostsService);
    posts(): Promise<Post[]>;
    post(args: string): Promise<Post>;
    create(args: NewPost): Promise<Post>;
    update(args: UpdatePost): Promise<Post>;
    delete(args: string): Promise<Post>;
    postCreated(): AsyncIterator<unknown, any, undefined>;
}
