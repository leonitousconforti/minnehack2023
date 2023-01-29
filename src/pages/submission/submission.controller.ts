import { Controller, Get, Render } from "@nestjs/common";

@Controller()
export class SubmissionController {
    @Get("/submission")
    @Render("submission")
    root() {
        return { message: "Hello world!" };
    }
}
