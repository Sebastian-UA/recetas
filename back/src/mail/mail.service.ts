import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true solo si se usa 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
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
        <p>Estas creando una cuenta para mi pag de recetas , te falta crear la contraseña , haz clic en el siguiente enlace para crear la contraseña:</p>
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
    await this.transporter.sendMail({
      to: correo,
      subject: 'Recuperar contraseña',
      html: `
      <h2>Hola ${nombre}</h2>
      <p>Solicitaste recuperar tu contraseña</p>
      <p>Haz click aquí:</p>
      <a href="${link}">${link}</a>
      <p>Este enlace expira en 1 hora</p>
    `,
    });
  }

}