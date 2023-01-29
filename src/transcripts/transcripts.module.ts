import { Module } from "@nestjs/common";

import { UsersModule } from "../users/users.module";
import { PrismaModule } from "../prisma/prisma.module";
import { TranscriptsService } from "./transcripts.service";
import { TranscriptsController } from "./transcripts.controller";
import { PoliticiansModule } from "src/politicians/politicians.module";

@Module({
    imports: [PrismaModule, UsersModule, PoliticiansModule],
    controllers: [TranscriptsController],
    providers: [TranscriptsService],
    exports: [TranscriptsService],
})
export class TranscriptsModule {}
