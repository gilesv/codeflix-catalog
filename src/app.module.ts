import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { GenreModule } from './genre/genre.module';

@Module({
  imports: [CategoryModule, GenreModule],
})
export class AppModule {}
