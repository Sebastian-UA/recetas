import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PasosService } from './pasos.service';
import { CreatePasoDto } from './dto/create-paso.dto';
import { UpdatePasoDto } from './dto/update-paso.dto';

@Controller('pasos')
export class PasosController {
  constructor(private readonly pasosService: PasosService) {}

  @Post()
  create(@Body() createPasoDto: CreatePasoDto) {
    return this.pasosService.create(createPasoDto);
  }

  @Get()
  findAll() {
    return this.pasosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pasosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePasoDto: UpdatePasoDto) {
    return this.pasosService.update(+id, updatePasoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pasosService.remove(+id);
  }
}
