import { Module } from "@nestjs/common";
import { TopPageController } from "./top-page.controller";
import { TypegooseModule } from "nestjs-typegoose";
import { TopPageModel } from "./top-page.model";

@Module({
    imports: [
      TypegooseModule.forFeature([
          {
              typegooseClass: TopPageModel,
              schemaOptions: {
                  collection: 'TopPage'
              }
          }
      ])
    ],
    controllers: [TopPageController]
})
export class TopPageModule {
}
