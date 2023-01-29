import { Controller, Get, Render } from "@nestjs/common";

@Controller()
export class LoginController {
    @Get("/login")
    @Render("login")
    root() {
        return { message: "This doesn't work yet lol" };
    }
}
