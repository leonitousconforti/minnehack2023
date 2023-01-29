import { Module } from "@nestjs/common";

import { IndexModule } from "./pages/index/index.module";
import { LoginModule } from "./pages/login/login.module";
import { RegisterModule } from "./pages/register/register.module";
import { AnnotateModule } from "./pages/annotate/annotate.module";

@Module({ imports: [IndexModule, LoginModule, RegisterModule, AnnotateModule] })
export class AppModule {}
