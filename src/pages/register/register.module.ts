import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UsersService } from "src/users/users.service";

import { RegisterController } from "./register.controller";

@Module({ controllers: [RegisterController], providers: [UsersService, PrismaService] })
export class RegisterModule {}
