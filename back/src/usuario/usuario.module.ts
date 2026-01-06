import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule], // 👈 CLAVE
  controllers: [UsuarioController],
  providers: [UsuarioService, PrismaService],
})
export class UsuarioModule {}
