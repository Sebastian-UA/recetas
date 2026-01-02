import { Test, TestingModule } from '@nestjs/testing';
import { RecetaIgredientesController } from './receta-igredientes.controller';
import { RecetaIgredientesService } from './receta-igredientes.service';

describe('RecetaIgredientesController', () => {
  let controller: RecetaIgredientesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecetaIgredientesController],
      providers: [RecetaIgredientesService],
    }).compile();

    controller = module.get<RecetaIgredientesController>(RecetaIgredientesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
