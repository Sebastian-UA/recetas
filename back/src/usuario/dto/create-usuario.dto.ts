import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail()
  correo!: string;

  @IsString()
  nombre!: string;

  @IsString()
  @MinLength(6)
  contraseña!: string;
}
