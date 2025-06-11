import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    console.log('🔧 PrismaService constructor called');
    super();
    console.log('✅ PrismaClient instantiated');
  }

  async onModuleInit() {
    console.log('🔌 Attempting to connect to database...');
    try {
      await this.$connect();
      console.log('✅ Connected to database successfully');
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      throw error;
    }
  }
}
