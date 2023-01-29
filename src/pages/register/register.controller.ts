import { Controller, Get, Render } from "@nestjs/common";

@Controller()
export class RegisterController {
    @Get("/register")
    @Render("register")
    root() {
        return { message: "Hello world!" };
    }
}
