import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit {

  constructor() {
    super(); // 👈 así, vacío
  }

  async onModuleInit() {
    await this.$connect();
  }
}
