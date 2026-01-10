import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RecetaService } from './receta.service';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtRequest } from '../auth/jwt-request.interface';
import { AddIngredienteDto } from './dto/add-ingrediente.dto';
import { UpdateIngredienteDto } from './dto/update-ingrediente.dto';

@Controller('receta')
@UseGuards(JwtAuthGuard)
export class RecetaController {
  constructor(private readonly recetaService: RecetaService) { }

  @Post()
  create(@Body() dto: CreateRecetaDto, @Req() req: JwtRequest) {
    return this.recetaService.create(dto, req.user.id);
  }

  @Get()
  findMisRecetas(@Req() req: JwtRequest) {
    return this.recetaService.findByUsuario(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: JwtRequest) {
    const receta = await this.recetaService.findOne(+id, req.user.id);

    if (!receta) {
      throw new NotFoundException('Receta no encontrada');
    }

    return receta;
  }

  @Post(':id/ingrediente')
  addIngrediente(
    @Param('id') id: string,
    @Body() dto: AddIngredienteDto,
    @Req() req: JwtRequest,
  ) {
    return this.recetaService.addIngrediente(
      +id,
      req.user.id,
      dto,
    );
  }

  @Patch('ingrediente/:id')
  updateIngrediente(
    @Param('id') id: string,
    @Body() dto: UpdateIngredienteDto,
    @Req() req: JwtRequest,
  ) {
    return this.recetaService.updateIngrediente(
      +id,
      req.user.id,
      dto,
    );
  }

}
