import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class RecetaService {
  constructor(private prismaService: PrismaService) {}

  create(dto: CreateRecetaDto, usuarioId: number) {
    return this.prismaService.receta.create({
      data: {
        nombre: dto.nombre,
        imagen: dto.imagen,
        usuario: {
          connect: { id: usuarioId },
        },
      },
    });
  }

  findByUsuario(usuarioId: number) {
    return this.prismaService.receta.findMany({
      where: { usuario_id: usuarioId },
      orderBy: { createdAt: 'desc' },
    });
  }

  findAll() {
    return this.prismaService.receta.findMany({
      include: { usuario: true },
    });
  }

  async remove(id: number) {
    return this.prismaService.receta.delete({
      where: { id },
    });
  }
}
