import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER, // tu correo
        pass: process.env.MAIL_PASS, // contraseña de app
      },
    });
  }

  // 🔹 CORREO DE PRUEBA
  async sendTestMail(correo: string, nombre: string) {
    await this.transporter.sendMail({
      to: correo,
      subject: 'Correo de prueba',
      html: `
        <h2>Hola ${nombre}</h2>
        <p>Si ves este correo, el sistema funciona correctamente ✅</p>
      `,
    });

    return { message: 'Correo de prueba enviado' };
  }

  // 🔹 CORREO PARA CREAR CONTRASEÑA
  async sendCreatePasswordMail(
    correo: string,
    nombre: string,
    link: string,
  ) {
    await this.transporter.sendMail({
      to: correo,
      subject: 'Crea tu contraseña',
      html: `
        <h2>Hola ${nombre}</h2>
        <p>Haz click en el siguiente enlace para crear tu contraseña:</p>
        <a href="${link}">${link}</a>
        <p>Este enlace expira en 1 hora</p>
      `,
    });
  }
}