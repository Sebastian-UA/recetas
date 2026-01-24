import * as dotenv from 'dotenv';

dotenv.config();   // 🔥 Cargar .env antes de todo

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); // ya lo tenías perfecto
  app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();
