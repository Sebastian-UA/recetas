import { IsString, MinLength } from 'class-validator';

export class CrearPasswordDto {
  @IsString()
  token!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}
