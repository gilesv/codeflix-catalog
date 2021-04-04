import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { DbModule } from '../db/db.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [DbModule, CategoryModule],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MovieModule {}
