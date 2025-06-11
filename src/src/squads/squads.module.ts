import { Module } from '@nestjs/common';
import { SquadsService } from './squads.service';
import { SquadsController } from './squads.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SquadsController],
  providers: [SquadsService, PrismaService],
})
export class SquadsModule {}
