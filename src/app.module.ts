import { Module } from "@nestjs/common";

import { IndexModule } from "./pages/index/index.module";
import { LoginModule } from "./pages/login/login.module";
import { RegisterModule } from "./pages/register/register.module";

@Module({ imports: [IndexModule, LoginModule, RegisterModule] })
export class AppModule {}
