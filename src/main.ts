import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as graphqlUploadExpress from 'graphql-upload/public/graphqlUploadExpress.js';
import * as dotenv from 'dotenv';

const PORT = process.env.PORT || 3001

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    methods: ['GET', 'PATCH', 'OPTIONS', 'POST', 'PUT', 'DELETE', 'HEAD'],
  });
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));

  await app.listen(PORT);
}
bootstrap();
