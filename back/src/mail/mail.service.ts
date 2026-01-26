import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendCreatePasswordMail(
    correo: string,
    nombre: string,
    link: string,
  ) {
    await this.resend.emails.send({
      from: process.env.MAIL_FROM!, // onboarding@resend.dev
      to: correo,
      subject: 'Crea tu contraseña',
      html: `
        <h2>Hola ${nombre}</h2>
        <p>Estás creando una cuenta en mi página de recetas.</p>
        <p>Haz clic en el siguiente enlace para crear tu contraseña:</p>
        <a href="${link}">${link}</a>
        <p>Este enlace expira en 1 hora</p>
      `,
    });
  }

  async sendRecoverPasswordMail(
    correo: string,
    nombre: string,
    link: string,
  ) {
    await this.resend.emails.send({
      from: process.env.MAIL_FROM!,
      to: correo,
      subject: 'Recuperar contraseña',
      html: `
        <h2>Hola ${nombre}</h2>
        <p>Solicitaste recuperar tu contraseña.</p>
        <a href="${link}">${link}</a>
        <p>Este enlace expira en 1 hora</p>
      `,
    });
  }
}
