import { User } from "@prisma/client";
import { Injectable } from "@nestjs/common";

import { UserRegistration } from "src/graphql.schema";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findOne(username: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                username,
            },
        });
    }

    async create(input: UserRegistration): Promise<User> {
        return this.prisma.user.create({
            data: input,
        });
    }
}