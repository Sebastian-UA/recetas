import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  // 🔹 endpoint solo para pruebas
  @Post('test')
  async sendTestMail(
    @Body()
    body: {
      correo: string;
      nombre: string;
    },
  ) {
    return this.mailService.sendTestMail(
      body.correo,
      body.nombre,
    );
  }
}