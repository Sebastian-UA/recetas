import { PartialType } from '@nestjs/mapped-types';
import { CreatePasoDto } from './create-paso.dto';

export class UpdatePasoDto extends PartialType(CreatePasoDto) {}
