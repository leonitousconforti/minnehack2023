import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class TranscriptService {
    constructor(private prisma: PrismaService) {}
}
