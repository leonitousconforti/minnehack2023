import { Post } from "@prisma/client";
import { NewPost, UpdatePost } from "src/graphql.schema";
import { PrismaService } from "../prisma/prisma.service";
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(id: string): Promise<Post | null>;
    findAll(): Promise<Post[]>;
    create(input: NewPost): Promise<Post>;
    update(params: UpdatePost): Promise<Post>;
    delete(id: string): Promise<Post>;
}
