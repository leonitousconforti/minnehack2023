import { Injectable } from "@nestjs/common";
import { Transcript } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

type TranscriptCreate = {
    TranscriptDate: string;
    TranscriptText: string;
    UserID: string;
    PoliticiansIDs: string[];
};

@Injectable()
export class TranscriptsService {
    constructor(private prisma: PrismaService) {}

    async findOne(id: string): Promise<Transcript | undefined> {
        return this.prisma.transcript.findUnique({ where: { TranscriptID: id } });
    }

    async create(data: TranscriptCreate) {
        const transcriptEntity = await this.prisma.transcript.create({
            data: {
                TranscriptDate: data.TranscriptDate,
                TranscriptText: data.TranscriptText,
                User: {
                    connect: {
                        UserID: data.UserID,
                    },
                },
            },
        });

        for (const politicianId of data.PoliticiansIDs) {
            await this.prisma.politicianTranscript.create({
                data: {
                    Transcript: {
                        connect: {
                            TranscriptID: transcriptEntity.TranscriptID,
                        },
                    },
                    Politician: {
                        connect: {
                            PoliticianID: politicianId,
                        },
                    },
                },
            });
        }

        return transcriptEntity;
    }
}
