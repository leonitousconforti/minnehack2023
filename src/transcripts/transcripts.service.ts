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
        return this.prisma.transcript.create({ data });
    }
}
