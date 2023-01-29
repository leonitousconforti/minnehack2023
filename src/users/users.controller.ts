import * as bcrypt from "bcrypt";
import { Response, Request } from "express";
import { Body, Controller, Get, Post, UseGuards, Req, Render, Res } from "@nestjs/common";

import { UsersService } from "./users.service";
import { LocalAuthGuard } from "../auth/local.auth.guard";
import { AuthenticatedGuard } from "../auth/authenticated.guard";

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get("/register")
    @Render("register")
    async renderRegisterPage(@Req() request: Request, @Res() response: Response, error?: string) {
        if (request.user) return response.redirect("/me");
        return { error };
    }

    @Get("/login")
    @Render("login")
    async renderLoginPage(@Req() request: Request, @Res() response: Response, error?: string) {
        if (request.user) return response.redirect("/me");
        return { error };
    }

    @Post("/register")
    async registerUser(
        @Body("address") address: string,
        @Body("username") username: string,
        @Body("password") password: string,
        @Body("password2") password2: string,
        @Res() response: Response
    ) {
        // Check that passwords match
        if (password != password2) {
            return response.render("register", { error: "Passwords do not match." });
        }

        // Check if username is already taken
        const maybeUser = await this.usersService.findOne(username);
        if (maybeUser) {
            return response.render("register", { error: "User already exists." });
        }

        // All good, salt+hash password and create user
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        await this.usersService.create({ username, password: hashedPassword, address: address || "" });

        // Redirect to login
        return response.redirect("/login");
    }

    @UseGuards(LocalAuthGuard)
    @Post("/login")
    login(@Res() response: Response) {
        return response.redirect("/me");
    }

    @UseGuards(AuthenticatedGuard)
    @Get("/me")
    @Render("me")
    getMe() {
        return {};
    }

    @Get("/logout")
    logout(@Req() request: Request, @Res() response: Response) {
        request.session.destroy(() => undefined);
        response.redirect("/login");
    }
}
