import { Module } from '@nestjs/common';
import { PasosService } from './pasos.service';
import { PasosController } from './pasos.controller';

@Module({
  controllers: [PasosController],
  providers: [PasosService],
})
export class PasosModule {}
