import { Test, TestingModule } from '@nestjs/testing';
import { PasosService } from './pasos.service';

describe('PasosService', () => {
  let service: PasosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasosService],
    }).compile();

    service = module.get<PasosService>(PasosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
