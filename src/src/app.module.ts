import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SquadsModule } from './squads/squads.module';
import { ProjectsModule } from './projects/projects.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from 'config/configuration';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    SquadsModule,
    ProjectsModule,
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env`,
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
