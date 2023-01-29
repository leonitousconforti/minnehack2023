import * as path from "path";
import * as passport from "passport";
import * as session from "express-session";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";

import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.use(
        session({
            secret: "asdf",
            resave: false,
            saveUninitialized: false,
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.useStaticAssets(path.join(__dirname, "..", "public"));
    app.useStaticAssets(path.join(__dirname, "..", "css"));
    app.setBaseViewsDir(path.join(__dirname, "..", "views"));
    app.setViewEngine("hbs");

    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
