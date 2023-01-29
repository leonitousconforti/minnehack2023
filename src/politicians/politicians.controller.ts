import { Controller, Get } from "@nestjs/common";

import { PoliticiansService } from "./politicians.service";

@Controller()
export class PoliticiansController {
    constructor(private readonly politiciansService: PoliticiansService) {}

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
