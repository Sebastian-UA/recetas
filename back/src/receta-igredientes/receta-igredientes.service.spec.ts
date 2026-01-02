import { Test, TestingModule } from '@nestjs/testing';
import { RecetaIgredientesService } from './receta-igredientes.service';

describe('RecetaIgredientesService', () => {
  let service: RecetaIgredientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecetaIgredientesService],
    }).compile();

    service = module.get<RecetaIgredientesService>(RecetaIgredientesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
