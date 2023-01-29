import * as bcrypt from "bcrypt";
import { Injectable, NotAcceptableException } from "@nestjs/common";

import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        const passwordValid = await bcrypt.compare(password, user.UserPassword);

        if (!user) {
            throw new NotAcceptableException("could not find the user");
        }

        if (user && passwordValid) {
            const { UserPassword, ...rest } = user;
            return rest;
        }

        return null;
    }
}
