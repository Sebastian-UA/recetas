import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuarioService {

  constructor(
    private prismaService: PrismaService ,) { }


  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      return await this.prismaService.usuario.create({
        data: createUsuarioDto
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "p2002") {
          throw new ConflictException(`el correo ${createUsuarioDto.correo} ya existe`);
        }
      }
    }
  }

  findAll() {
    return this.prismaService.usuario.findMany({})
  }

  async login(correo: string, contraseña: string) {
    const usuario = await this.prismaService.usuario.findUnique({
      where: { correo },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no existe');
    }

    if (usuario.contraseña !== contraseña) {
      throw new ConflictException('Contraseña incorrecta');
    }

    return usuario; // 👈 SOLO el usuario
  }


  async findOne(id: number) {
    const usuarioFound = await this.prismaService.usuario.findUnique({
      where: {
        id: id
      }
    })
    if (!usuarioFound) {
      throw new NotFoundException(`el usuario ${id} no existe `);
    }

    return usuarioFound;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const ActualUsuario = await this.prismaService.usuario.update({
      where: {
        id
      },
      data: {

      }
    })
    if (!ActualUsuario) {
      throw new NotFoundException(`el usuario ${id} no existe `);
    }
    return ActualUsuario
  }

  async remove(id: number) {
    const borrarUsuario = await this.prismaService.usuario.delete({
      where: {
        id
      }
    })
    if (!borrarUsuario) {
      throw new NotFoundException(`el usuario ${id} no existe `);
    }
    return borrarUsuario
  }
}
