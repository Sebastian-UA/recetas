import * as dotenv from 'dotenv';

dotenv.config();   // cargar .env antes de todo

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {//iniciar todo
  const app = await NestFactory.create(AppModule);//cree el servidor

  app.setGlobalPrefix('api');
  app.enableCors();//activar los cors permite que front acceda a back

  await app.listen(process.env.PORT ?? 4000);
}


bootstrap();
