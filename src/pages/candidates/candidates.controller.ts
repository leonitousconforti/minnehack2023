import { Controller, Get, Render } from "@nestjs/common";

@Controller()
export class CandidatesController {
    @Get("/candidates")
    @Render("candidates")
    root() {
        return {};
    }
}
