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

    @Get("/transcript")
    @Render("transcript")
    async renderTranscript(@Req() request: Request) {
        return {
            transcript:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper fermentum velit, a blandit est dictum et. Nunc ut fermentum nisl, et rhoncus orci. Phasellus hendrerit, magna scelerisque tempor blandit, ante dui fringilla dolor, in fringilla purus lorem id risus. Nulla malesuada aliquet eros in accumsan. Mauris molestie enim leo. Duis vel ultrices felis, non euismod mauris. Cras dictum viverra nulla, sit amet luctus arcu ornare a. Donec condimentum commodo justo, sit amet mattis nulla suscipit nec. Sed pretium pretium tortor, id venenatis est lobortis ac. Morbi posuere venenatis diam, sit amet varius justo dictum id. In a eleifend neque. Praesent imperdiet urna leo, at maximus nisi egestas id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam finibus turpis vel ex aliquet interdum. Donec euismod vitae nisl non scelerisque.",
            loggedin: request.user != undefined,
        };
    }

    @Get("/submission")
    @Render("submission")
    async renderUploadTranscript(@Req() request: Request, @Res() response: Response) {
        if (!request.user) return response.redirect("/login");
        return { loggedin: request.user != undefined };
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
    @Post("/view-transcript/:id")
    async submitAnnotation(
        @Req() request: Request,
        @Res() response: Response,
        @Body("tag") tag: string,
        @Body("speaker") speaker: string,
        @Body("annotationText") annotationText: string
    ) {
        const transcriptEntity = await this.transcriptsService.findOne(request.params.id);
        if (!transcriptEntity) {
            return;
        }

        if (!transcriptEntity.TranscriptText.includes(annotationText)) {
            return response.render(`/view-transcript/${request.params.id}`, { error: "Invalid annotation" });
        }

        const StartIndex = transcriptEntity.TranscriptText.indexOf(annotationText);

        this.transcriptsService.createAnnotationForTranscript({
            TranscriptID: transcriptEntity.TranscriptID,
            UserID: (request.user as User).UserID,
            tags: [tag],
            StartIndex,
            Length: annotationText.length,
        });
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
