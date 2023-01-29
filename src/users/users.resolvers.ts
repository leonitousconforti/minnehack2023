import { Resolver, Mutation, Args } from "@nestjs/graphql";

import { UsersService } from "./users.service";
import { User, UserRegistration } from "src/graphql.schema";

@Resolver("User")
export class UsersResolvers {
    constructor(private readonly userService: UsersService) {}

    @Mutation("createUser")
    async create(@Args("input") args: UserRegistration): Promise<User> {
        const createdUser = await this.userService.create(args);
        return createdUser;
    }
}
