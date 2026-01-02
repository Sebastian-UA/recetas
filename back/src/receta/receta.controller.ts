import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { RecetaService } from './receta.service';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { JwtUser } from '../auth/jwt-payload.interface';

@Controller('receta')
@UseGuards(AuthGuard('jwt'))
export class RecetaController {
  constructor(private readonly recetaService: RecetaService) {}

  @Post()
  create(
    @Body() createRecetaDto: CreateRecetaDto,
    @Req() req: Request,
  ) {
    const user = req.user as JwtUser; // 👈 casting
    return this.recetaService.create(createRecetaDto, user.id);
  }

  @Get()
  findMisRecetas(@Req() req: Request) {
    const user = req.user as JwtUser;
    return this.recetaService.findByUsuario(user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recetaService.remove(+id);
  }
}
