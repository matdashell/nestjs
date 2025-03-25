import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';
import { AppModule } from './app.module';
import { BadRequestExceptionFilter } from './exception-filter/bad-request.exception-filter';
import { BusinessExceptionFilter } from './exception-filter/business.exception-filter';
import { DatabaseExceptionFilter } from './exception-filter/database.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error']
  })

  app.useGlobalFilters(
    new BusinessExceptionFilter(),
    new BadRequestExceptionFilter(),
    new DatabaseExceptionFilter(),
  )

  const filePath = join(__dirname, '..', 'swagger', 'openapi.swagger.yml');
  const swaggerYml = readFileSync(filePath, 'utf8');
  const swaggerDocument = parse(swaggerYml);

  SwaggerModule.setup('swagger-ui', app, swaggerDocument)
  await app.listen(process.env.PORT ?? 3001)
}
bootstrap();
