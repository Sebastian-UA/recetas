import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(usuario: any) {
    const payload = {
      sub: usuario.id,
      correo: usuario.correo,
    };

    return {
      token: this.jwtService.sign(payload),
      usuario,
    };
  }
}
