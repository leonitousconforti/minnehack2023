import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma/prisma.module";
import { PoliticiansService } from "./politicians.service";
import { PoliticiansController } from "./politicians.controller";

@Module({
    imports: [PrismaModule],
    controllers: [PoliticiansController],
    providers: [PoliticiansService],
    exports: [PoliticiansService],
})
export class PoliticiansModule {}
