import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { JwtUser } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT_SECRET no está definido en .env');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });

  }

  async validate(payload: any): Promise<JwtUser> {

    // 👉 Si tu token trae id
    return {
      id: payload.id,
      correo: payload.correo,
    };

    /* 
    ❗ SOLO usar esto si no quieres tocar el login:
    return {
      id: payload.sub,
      correo: payload.correo,
    };
    */
  }
}
