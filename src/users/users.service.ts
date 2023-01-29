import { User } from "@prisma/client";
import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

type UserRegistration = {
    address: string;
    username: string;
    password: string;
};

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findOne(username: string): Promise<User | undefined> {
        return this.prisma.user.findUnique({
            where: {
                UserName: username,
            },
        });
    }

    async create({ username, password, address }: UserRegistration): Promise<User> {
        return this.prisma.user.create({ data: { UserName: username, UserPassword: password, UserAddress: address } });
    }
}
