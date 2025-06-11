import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.use('/', (req: any, res: any, next: any) => {
    if (req.url === '/') {
      res.send('Welcome, for API use prefix /api');
      return;
    }
    next();
  });

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
