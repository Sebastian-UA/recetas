import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecetaDto } from './dto/create-receta.dto';

@Injectable()
export class RecetaService {
  constructor(private prisma: PrismaService) {}

  // Crear receta del usuario logueado
  async create(dto: CreateRecetaDto, usuarioId: number) {
    return this.prisma.receta.create({
      data: {
        nombre: dto.nombre,
        imagen: dto.imagen,
        usuario: {
          connect: { id: usuarioId },
        },
      },
    });
  }

  // Obtener SOLO mis recetas
  async findByUsuario(usuarioId: number) {
    return this.prisma.receta.findMany({
      where: {
        usuario_id: usuarioId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Obtener UNA receta SOLO si es mía
  async findOne(id: number, usuarioId: number) {
    return this.prisma.receta.findFirst({
      where: {
        id,
        usuario_id: usuarioId,
      },
    });
  }

  // Eliminar SOLO si es mía
  async remove(id: number, usuarioId: number) {
    return this.prisma.receta.deleteMany({
      where: {
        id,
        usuario_id: usuarioId,
      },
    });
  }
}
