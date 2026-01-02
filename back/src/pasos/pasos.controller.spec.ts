import { Test, TestingModule } from '@nestjs/testing';
import { PasosController } from './pasos.controller';
import { PasosService } from './pasos.service';

describe('PasosController', () => {
  let controller: PasosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasosController],
      providers: [PasosService],
    }).compile();

    controller = module.get<PasosController>(PasosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
