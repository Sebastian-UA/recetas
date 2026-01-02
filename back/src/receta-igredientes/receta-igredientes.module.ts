import { Module } from '@nestjs/common';
import { RecetaIgredientesService } from './receta-igredientes.service';
import { RecetaIgredientesController } from './receta-igredientes.controller';

@Module({
  controllers: [RecetaIgredientesController],
  providers: [RecetaIgredientesService],
})
export class RecetaIgredientesModule {}
