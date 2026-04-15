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
  app.enableCors({
    origin: ['https://v1-vitorga-vitrine-jourdankyllians-projects.vercel.app/','https://v1-vitorga-vitrine.vercel.app','http://localhost:4200/', 'http://localhost:5173/', 'http://localhost:3002', 'http://localhost:3000/api','http://localhost:3000'], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(3002);
  console.log('✅ Backend démarré sur http://localhost:3002');
}
bootstrap();
