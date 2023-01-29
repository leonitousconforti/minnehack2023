import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        // Change username to lower case
        const userName = username.toLowerCase();
        const user = await this.authService.validateUser(userName, password);

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
