import { Body, Controller, Get, Post, Render, Res } from "@nestjs/common";
import { Response } from "express";
import { UsersService } from "src/users/users.service";

@Controller()
export class RegisterController {
    constructor(private usersService: UsersService) {}
    @Get("/register")
    @Render("register")
    root(thing) {
        return {message: thing};
    }
    @Post("/register")
    async post(@Body() details, @Res() response: Response) {
        console.log(details)
        if(details.psw != details.psw2){
            response.render("register", {message: "Passwords do not match."});
        }
        else if(await this.usersService.findOne(details.uname) != undefined) {
            response.render("register", {message: "User already exists."});
        }
        else {
            this.usersService.create({
                username: details.uname,
                password: details.psw
            });
            response.render("login");
        }
    }
}
