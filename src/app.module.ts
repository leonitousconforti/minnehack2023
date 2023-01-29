import { Module } from "@nestjs/common";

import { IndexModule } from "./pages/index/index.module";
import { LoginModule } from "./pages/login/login.module";
import { RegisterModule } from "./pages/register/register.module";
import { AnnotateModule } from "./pages/annotate/annotate.module";
import { SubmissionModule } from "./pages/submission/submission.module";
import { TranscriptModule } from "./pages/transcript/transcript.module";
import { CandidatesModule } from "./pages/candidates/candidates.module";

@Module({ imports: [IndexModule, LoginModule, RegisterModule, SubmissionModule, AnnotateModule, CandidatesModule, TranscriptModule] })
export class AppModule {}
