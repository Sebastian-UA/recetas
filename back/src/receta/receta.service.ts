import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecetaDto } from './dto/create-receta.dto';

@Injectable()
export class RecetaService {
  constructor(private prisma: PrismaService) { }

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
      include: {
        receta_ingrediente: {
          include: {
            ingrediente: true,
          },
        },
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

  async addIngrediente(
    recetaId: number,
    usuarioId: number,
    dto: { nombre: string; cantidad: string },
  ) {
    // 1️⃣ verificar que la receta es del usuario
    const receta = await this.prisma.receta.findFirst({
      where: {
        id: recetaId,
        usuario_id: usuarioId,
      },
    });

    if (!receta) {
      throw new Error('Receta no encontrada');
    }

    // 2️⃣ buscar o crear ingrediente
    const ingrediente = await this.prisma.ingrediente.upsert({
      where: { nombre: dto.nombre },
      update: {},
      create: { nombre: dto.nombre },
    });

    // 3️⃣ crear relación
    return this.prisma.receta_ingrediente.create({
      data: {
        receta_id: recetaId,
        ingrediente_id: ingrediente.id,
        cantidad: dto.cantidad,
      },
      include: {
        ingrediente: true,
      },
    });
  }

}
