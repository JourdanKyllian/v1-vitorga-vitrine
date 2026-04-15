import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentModule } from './content/content.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-1-eu-north-1.pooler.supabase.com',
      port: 5432,
      username: 'postgres.qgnwpbbtlpnpuekmcive',
      password: 'vq2IwRwIiwt1yQBK',
      database: "postgres",
      autoLoadEntities: true,
      synchronize: true,
      ssl: { rejectUnauthorized: false }
    }),
    ContentModule,
    AuthModule,
  ],
})
export class AppModule {}
