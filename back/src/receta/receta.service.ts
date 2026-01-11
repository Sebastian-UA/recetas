import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdatePasoDto } from './dto/update-pasos.dto';

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
          include: { ingrediente: true },
        },
        pasos: {
          orderBy: { createdAt: 'asc' }, // 👈 ORDENADOS
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

  async updateIngrediente(
    recetaIngredienteId: number,
    usuarioId: number,
    dto: { nombre: string; cantidad: string },
  ) {
    // verificar que pertenece al usuario
    const ri = await this.prisma.receta_ingrediente.findFirst({
      where: {
        id: recetaIngredienteId,
        receta: {
          usuario_id: usuarioId,
        },
      },
      include: { ingrediente: true },
    });

    if (!ri) {
      throw new Error('Ingrediente no encontrado');
    }

    // actualizar nombre del ingrediente
    await this.prisma.ingrediente.update({
      where: { id: ri.ingrediente_id },
      data: { nombre: dto.nombre },
    });

    // actualizar cantidad
    return this.prisma.receta_ingrediente.update({
      where: { id: recetaIngredienteId },
      data: { cantidad: dto.cantidad },
      include: { ingrediente: true },
    });
  }

  async deleteIngrediente(
    recetaIngredienteId: number,
    usuarioId: number,
  ) {
    // verificar que el ingrediente pertenece a una receta del usuario
    const ri = await this.prisma.receta_ingrediente.findFirst({
      where: {
        id: recetaIngredienteId,
        receta: {
          usuario_id: usuarioId,
        },
      },
    });

    if (!ri) {
      throw new Error('Ingrediente no encontrado');
    }

    // eliminar solo la relación receta_ingrediente
    await this.prisma.receta_ingrediente.delete({
      where: {
        id: recetaIngredienteId,
      },
    });

    return { message: 'Ingrediente eliminado de la receta' };
  }

  async addPaso(
    recetaId: number,
    usuarioId: number,
    dto: { pasos: string },
  ) {
    const receta = await this.prisma.receta.findFirst({
      where: {
        id: recetaId,
        usuario_id: usuarioId,
      },
      include: {
        pasos: true,
      },
    });

    if (!receta) {
      throw new Error('Receta no encontrada');
    }

    return this.prisma.pasos.create({
      data: {
        receta_id: recetaId,
        pasos: dto.pasos,
      },
    });
  }


  async updatePaso(
    pasoId: number,
    usuarioId: number,
    dto: UpdatePasoDto,
  ) {
    const paso = await this.prisma.pasos.findFirst({
      where: {
        id: pasoId,
        receta: {
          usuario_id: usuarioId,
        },
      },
    });

    if (!paso) {
      throw new Error('Paso no encontrado');
    }

    return this.prisma.pasos.update({
      where: { id: pasoId },
      data: {
        pasos: dto.pasos,
      },
    });
  }

  async deletePaso(
    pasoId: number,
    usuarioId: number,
  ) {
    const paso = await this.prisma.pasos.findFirst({
      where: {
        id: pasoId,
        receta: {
          usuario_id: usuarioId,
        },
      },
    });

    if (!paso) {
      throw new Error('Paso no encontrado');
    }

    await this.prisma.pasos.delete({
      where: { id: pasoId },
    });

    return { message: 'Paso eliminado' };
  }


}

