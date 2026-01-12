import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(private prismaService: PrismaService) { }

  // 🔹 REGISTRO
  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const hash = await bcrypt.hash(createUsuarioDto.contraseña, 10);

      return await this.prismaService.usuario.create({
        data: {
          correo: createUsuarioDto.correo,
          nombre: createUsuarioDto.nombre,
          contraseña: hash,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            `El correo ${createUsuarioDto.correo} ya existe`,
          );
        }
      }
      throw error;
    }
  }

  findAll() {
    return this.prismaService.usuario.findMany({
      select: {
        id: true,
        correo: true,
        nombre: true,
      },
    });
  }

  async findOne(id: number) {
    const usuario = await this.prismaService.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        correo: true,
        nombre: true,
      },
    });

    if (!usuario) {
      throw new NotFoundException(`El usuario ${id} no existe`);
    }

    return usuario;
  }

  async update(id: number, dto: UpdateUsuarioDto) {
    const data: any = { ...dto };

    if (dto.contraseña) {
      data.contraseña = await bcrypt.hash(dto.contraseña, 10);
    }

    return this.prismaService.usuario.update({
      where: { id },
      data,
    });
  }


  async remove(id: number) {
    const usuario = await this.prismaService.usuario.delete({
      where: { id },
    });

    if (!usuario) {
      throw new NotFoundException(`El usuario ${id} no existe`);
    }

    return usuario;
  }

  async login(correo: string, contraseña: string) {
    const usuario = await this.prismaService.usuario.findUnique({
      where: { correo },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no existe');
    }

    const passwordOk = await bcrypt.compare(
      contraseña,
      usuario.contraseña
    );

    if (!passwordOk) {
      throw new ConflictException('Contraseña incorrecta');
    }

    // ❗ nunca devuelvas la contraseña
    const { contraseña: _, ...usuarioSinPassword } = usuario;

    return usuarioSinPassword;
  }

}
