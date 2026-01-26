import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import { MailService } from 'src/mail/mail.service';
import { MailModule } from 'src/mail/mail.module';


@Injectable()
export class UsuarioService {


  constructor(private prismaService: PrismaService, private mailService: MailService) { }

  /* =========================
     REGISTRO (SIN CONTRASEÑA)
     ========================= */
  async create(dto: CreateUsuarioDto) {
    return this.prismaService.usuario.create({
      data: {
        correo: dto.correo,
        nombre: dto.nombre,
        contraseña: null,
      },
      select: {
        id: true,
        correo: true,
        nombre: true,
      },
    });
  }

  /* =========================
     REGISTRO + TOKEN EMAIL
     ========================= */
  async register(correo: string, nombre?: string) {
    const usuario = await this.prismaService.usuario.create({
      data: {
        correo,
        nombre: nombre ?? 'Usuario',
        contraseña: null,
      },
    });

    const token = crypto.randomUUID();

    await this.prismaService.passwordToken.create({
      data: {
        token,
        usuarioId: usuario.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60),
      },
    });

    const link = `${process.env.FRONTEND_URL}/crear-password?token=${token}`;

    await this.mailService.sendCreatePasswordMail(
      usuario.correo,
      usuario.nombre,
      link,
    );

    return {
      message: 'Usuario creado. Revisa tu correo para crear la contraseña',
    };
  }


  /* =========================
     CREAR CONTRASEÑA
     ========================= */
  async crearPassword(token: string, password: string) {
    const passwordToken =
      await this.prismaService.passwordToken.findUnique({
        where: { token },
        include: { usuario: true },
      });

    if (!passwordToken || passwordToken.used) {
      throw new BadRequestException('Token inválido');
    }

    if (passwordToken.expiresAt < new Date()) {
      throw new BadRequestException('Token expirado');
    }

    const hash = await bcrypt.hash(password, 10);

    await this.prismaService.usuario.update({
      where: { id: passwordToken.usuarioId },
      data: { contraseña: hash },
    });

    await this.prismaService.passwordToken.update({
      where: { id: passwordToken.id },
      data: { used: true },
    });

    return { message: 'Contraseña creada correctamente' };
  }

  /* =========================
     LOGIN
     ========================= */
  async login(correo: string, contraseña: string) {
    const usuario = await this.prismaService.usuario.findUnique({
      where: { correo },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no existe');
    }

    if (!usuario.contraseña) {
      throw new ConflictException(
        'Debes crear tu contraseña desde el correo',
      );
    }

    const passwordOk = await bcrypt.compare(
      contraseña,
      usuario.contraseña,
    );

    if (!passwordOk) {
      throw new ConflictException('Contraseña incorrecta');
    }

    // nunca devolver la contraseña
    const { contraseña: _, ...usuarioSinPassword } = usuario;

    return usuarioSinPassword;
  }

  /* =========================
     CRUD
     ========================= */
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
      select: {
        id: true,
        correo: true,
        nombre: true,
      },
    });
  }

  async remove(id: number) {
    return this.prismaService.usuario.delete({
      where: { id },
      select: {
        id: true,
        correo: true,
        nombre: true,
      },
    });
  }
  
  async solicitarRecuperacion(correo: string) {
    const usuario = await this.prismaService.usuario.findUnique({
      where: { correo },
    });

    // ⚠️ seguridad: no decir si existe o no
    if (!usuario) {
      return {
        message: 'Si el correo existe, se enviará un enlace',
      };
    }

    const token = crypto.randomUUID();

    await this.prismaService.passwordToken.create({
      data: {
        token,
        usuarioId: usuario.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60), // 1 hora
      },
    });

    const link = `${process.env.FRONTEND_URL}/recuperar-password?token=${token}`;

    await this.mailService.sendRecoverPasswordMail(
      usuario.correo,
      usuario.nombre,
      link,
    );

    return {
      message: 'Si el correo existe, se enviará un enlace',
    };
  }

}