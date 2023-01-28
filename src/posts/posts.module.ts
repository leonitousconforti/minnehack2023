import { Module } from "@nestjs/common";

import { PostsService } from "./posts.service";
import { PostsResolvers } from "./posts.resolvers";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    providers: [PostsResolvers, PostsService],
    imports: [PrismaModule],
})
export class PostsModule {}
