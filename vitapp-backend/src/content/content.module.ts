import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './content.entity';
import { ContentController } from './content.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Content])],
  controllers: [ContentController],
})
export class ContentModule {}