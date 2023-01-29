import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { AppController } from "./app.controller";
import { UsersModule } from "./users/users.module";
import { TranscriptsModule } from "./transcripts/transcripts.module";
import { PoliticiansModule } from "./politicians/politicians.module";

@Module({ imports: [PoliticiansModule, TranscriptsModule, UsersModule, AuthModule], controllers: [AppController] })
export class AppModule {}
