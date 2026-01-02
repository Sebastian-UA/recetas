import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { RecetaService } from './receta.service';
import { CreateRecetaDto } from './dto/create-receta.dto';

@Controller('receta')
export class RecetaController {
  constructor(private readonly recetaService: RecetaService) {}

  @Post()
  create(@Body() createRecetaDto: CreateRecetaDto) {
    const usuarioId = 1; // 🔴 fijo por ahora
    return this.recetaService.create(createRecetaDto, usuarioId);
  }

  @Get()
  findMisRecetas() {
    const usuarioId = 1; // 🔴 fijo por ahora
    return this.recetaService.findByUsuario(usuarioId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recetaService.remove(+id);
  }
}
