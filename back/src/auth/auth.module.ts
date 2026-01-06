import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule,   // 👈 para poder usar process.env.JWT_SECRET

    PassportModule.register({
      defaultStrategy: 'jwt',
    }),

    JwtModule.register({
      secret: process.env.JWT_SECRET,   // 🔥 MISMO secreto que usa JwtStrategy
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    JwtStrategy,     // 👈 estrategia registrada en Passport
  ],

  exports: [
    JwtModule,       // 👈 por si otros módulos necesitan verificar tokens
    AuthService,
  ],
})
export class AuthModule {}
