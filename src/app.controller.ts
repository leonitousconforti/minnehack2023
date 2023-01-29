import { Controller, Get, Render, Req } from "@nestjs/common";
import { Request } from "express";

@Controller()
export class AppController {
    @Get("/")
    @Render("index")
    root(@Req() request: Request) {
        return {loggedin: request.user != undefined};
    }
}
