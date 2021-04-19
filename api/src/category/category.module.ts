import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  exports: [CategoryService],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
