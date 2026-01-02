import { PartialType } from '@nestjs/mapped-types';
import { CreateRecetaIgredienteDto } from './create-receta-igrediente.dto';

export class UpdateRecetaIgredienteDto extends PartialType(CreateRecetaIgredienteDto) {}
