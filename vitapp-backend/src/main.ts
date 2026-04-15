import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "validator.swagger.io"],
          scriptSrc: ["'self'", "https:", "'unsafe-inline'"],
        },
      },
    }),
  );
  app.enableCors({});
  await app.listen(3002);
  console.log('✅ Backend démarré sur http://localhost:3002');
}
bootstrap();
