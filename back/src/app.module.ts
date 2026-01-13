import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RecetaModule } from './receta/receta.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PasosModule } from './pasos/pasos.module';
import { RecetaIgredientesModule } from './receta-igredientes/receta-igredientes.module';
import { IngredientesModule } from './ingredientes/ingredientes.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 🔥 ESTO ES CLAVE
    }),
    RecetaModule,
    UsuarioModule,
    PasosModule,
    RecetaIgredientesModule,
    IngredientesModule,
    AuthModule,
    MailModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
