import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from "fs";
import { join } from "path";
import { parse } from "yaml";
import { AppModule } from "./app.module";
import { GlobalExceptionFilter } from "./handler/global.exception-filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new GlobalExceptionFilter())

  const filePath = join(__dirname, '..', 'swagger', 'openapi.swagger.yml');
  const swaggerYml = readFileSync(filePath, 'utf8');
  const swaggerDocument = parse(swaggerYml);

  SwaggerModule.setup('swagger-ui', app, swaggerDocument)
  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()