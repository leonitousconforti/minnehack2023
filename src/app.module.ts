import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

import { AppController } from "./app.controller";
import { UsersModule } from "./users/users.module";

@Module({
    imports: [
        UsersModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            typePaths: ["./**/*.graphql"],
            installSubscriptionHandlers: true,
        }),
    ],
    controllers: [AppController],
})
export class AppModule {}
