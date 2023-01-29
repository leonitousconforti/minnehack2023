import { Controller, Get, Render } from "@nestjs/common";

@Controller()
export class AnnotateController {
    @Get("/annotate")
    @Render("annotate")
    root() {
        return {};
    }
}
