import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AuthService } from 'src/auth/auth.service';
import { ParseIntPipe } from '@nestjs/common';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly authService: AuthService,
  ) { }

  /* ================= REGISTRO ================= */

  // Registro SIN contraseña
  @Post('register')
  register(
    @Body() body: { correo: string; nombre: string },
  ) {
    return this.usuarioService.register(body.correo, body.nombre);
  }

  // Crear contraseña desde link
  @Post('crear-password')
  crearPassword(
    @Body() body: { token: string; password: string },
  ) {
    return this.usuarioService.crearPassword(
      body.token,
      body.password,
    );
  }

  /* ================= LOGIN ================= */

  @Post('login')
  async login(
    @Body() body: { correo: string; contraseña: string },
  ) {
    const usuario = await this.usuarioService.login(
      body.correo,
      body.contraseña,
    );

    return this.authService.login(usuario);
  }

  /* ================= CRUD USUARIO ================= */

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUsuarioDto,
  ) {
    return this.usuarioService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }

  @Post('recover')
  recover(@Body() body: { correo: string }) {
    return this.usuarioService.solicitarRecuperacion(body.correo);
  }

  @Post('reset-password')
  resetPassword(
    @Body() body: { token: string; password: string },
  ) {
    return this.usuarioService.crearPassword(
      body.token,
      body.password,
    );
  }

}
