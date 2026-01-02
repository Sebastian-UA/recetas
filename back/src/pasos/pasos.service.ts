import { Injectable } from '@nestjs/common';
import { CreatePasoDto } from './dto/create-paso.dto';
import { UpdatePasoDto } from './dto/update-paso.dto';

@Injectable()
export class PasosService {
  create(createPasoDto: CreatePasoDto) {
    return 'This action adds a new paso';
  }

  findAll() {
    return `This action returns all pasos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paso`;
  }

  update(id: number, updatePasoDto: UpdatePasoDto) {
    return `This action updates a #${id} paso`;
  }

  remove(id: number) {
    return `This action removes a #${id} paso`;
  }
}
