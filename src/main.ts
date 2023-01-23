import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");
    await app.listen(3000);

    const documentConfig = new DocumentBuilder()
      .setTitle('Learning NestJS Project')
      .setDescription('Документация к API')
      .setVersion('1.0.0')
      .build()

    const document = SwaggerModule.createDocument(app, documentConfig);
    SwaggerModule.setup('/docs', app, document)
}

bootstrap();
