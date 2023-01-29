import { Module } from "@nestjs/common";

import { AnnotateController } from "./annotate.controller";

@Module({ controllers: [AnnotateController] })
export class AnnotateModule {}
