import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecetaIgredientesService } from './receta-igredientes.service';
import { CreateRecetaIgredienteDto } from './dto/create-receta-igrediente.dto';
import { UpdateRecetaIgredienteDto } from './dto/update-receta-igrediente.dto';

@Controller('receta-igredientes')
export class RecetaIgredientesController {
  constructor(private readonly recetaIgredientesService: RecetaIgredientesService) {}

  @Post()
  create(@Body() createRecetaIgredienteDto: CreateRecetaIgredienteDto) {
    return this.recetaIgredientesService.create(createRecetaIgredienteDto);
  }

  @Get()
  findAll() {
    return this.recetaIgredientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recetaIgredientesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecetaIgredienteDto: UpdateRecetaIgredienteDto) {
    return this.recetaIgredientesService.update(+id, updateRecetaIgredienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recetaIgredientesService.remove(+id);
  }
}
