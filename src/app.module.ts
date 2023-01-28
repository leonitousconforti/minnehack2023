import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

import { AppController } from "./app.controller";
import { PostsModule } from "./posts/posts.module";

@Module({
    imports: [
        PostsModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            typePaths: ["./**/*.graphql"],
            installSubscriptionHandlers: true,
        }),
    ],
    controllers: [AppController],
})
export class AppModule {}
