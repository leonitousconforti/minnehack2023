import { Controller, Get, Render } from "@nestjs/common";

@Controller()
export class LoginController {
    @Get()
    @Render("login")
    root() {
        return { message: "Hello world!" };
    }
}
