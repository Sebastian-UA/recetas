import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')//para que la direccion tenga el "api"

  app.enableCors();//para permitir que se pueda conectar el puerto del front
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
