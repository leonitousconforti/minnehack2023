import { User } from "@prisma/client";
import { Response, Request } from "express";
import { Controller, Get, Render, Req, Res } from "@nestjs/common";

import { PoliticiansService } from "./politicians.service";

@Controller()
export class PoliticiansController {
    constructor(private readonly politiciansService: PoliticiansService) {}

    @Get("/candidates")
    @Render("candidates")
    async renderCandidates(@Req() request: Request, @Res() response: Response) {
        return {loggedin: request.user != undefined};
    }

    @Get("/initializePoliticians")
    async initializePoliticians() {
        await this.politiciansService.initializeAll();
        return { msg: "Done!" };
    }

    @Get("/allPoliticians")
    async renderPoliticianList() {
        return this.politiciansService.getAll();
    }
}
