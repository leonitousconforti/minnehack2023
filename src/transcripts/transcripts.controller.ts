import { User } from "@prisma/client";
import { Response, Request } from "express";
import { Body, Controller, Get, Post, Render, Req, Res, UseGuards } from "@nestjs/common";

import { UsersService } from "../users/users.service";
import { TranscriptsService } from "./transcripts.service";
import { AuthenticatedGuard } from "../auth/authenticated.guard";
import { PoliticiansService } from "src/politicians/politicians.service";

@Controller()
export class TranscriptsController {
    constructor(
        private readonly usersService: UsersService,
        private readonly transcriptsService: TranscriptsService,
        private readonly politiciansService: PoliticiansService
    ) {}

    @Get("/submission")
    @Render("submission")
    async renderUploadTranscript(@Req() request: Request, @Res() response: Response) {
        if (!request.user) return response.redirect("/login");
        return {};
    }

    @Get("/view-transcript/:id")
    @Render("transcript")
    async renderViewTranscript(@Req() request: Request) {
        const transcript = await this.transcriptsService.findOne(request.params.id);
        if (transcript) {
            return { transcript: transcript.TranscriptText };
        }

        return { transcript: "not found :(" };
    }

    @UseGuards(AuthenticatedGuard)
    @Post("/submission")
    async uploadSubmission(
        @Req() request: Request,
        @Res() response: Response,
        @Body("date") date: string,
        @Body("politicians") politician: string,
        @Body("transcript") transcript: string
    ) {
        const politicians = politician.split(",").map((politician) => politician.trim());

        const politicianEntities = politicians.map(
            async (politician) => await this.politiciansService.findByName(politician)
        );
        const responses = await Promise.all(politicianEntities);

        if (!responses.every((response2) => response2)) {
            return response.render("submission", { error: "Invalid politician names" });
        }

        const transcriptEntity = await this.transcriptsService.create({
            UserID: (request.user as User).UserID,
            TranscriptDate: date,
            TranscriptText: transcript,
            PoliticiansIDs: responses.map((response) => response.PoliticianID),
        });
        return response.redirect("/view-transcript/" + transcriptEntity.TranscriptID);
    }
}