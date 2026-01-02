import { Injectable } from '@nestjs/common';
import { CreateRecetaIgredienteDto } from './dto/create-receta-igrediente.dto';
import { UpdateRecetaIgredienteDto } from './dto/update-receta-igrediente.dto';

@Injectable()
export class RecetaIgredientesService {
  create(createRecetaIgredienteDto: CreateRecetaIgredienteDto) {
    return 'This action adds a new recetaIgrediente';
  }

  findAll() {
    return `This action returns all recetaIgredientes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recetaIgrediente`;
  }

  update(id: number, updateRecetaIgredienteDto: UpdateRecetaIgredienteDto) {
    return `This action updates a #${id} recetaIgrediente`;
  }

  remove(id: number) {
    return `This action removes a #${id} recetaIgrediente`;
  }
}
