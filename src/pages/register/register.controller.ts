import { Controller, Get, Render } from "@nestjs/common";

@Controller()
export class RegisterController {
    @Get()
    @Render("register")
    root() {
        return { message: "Hello world!" };
    }
}
