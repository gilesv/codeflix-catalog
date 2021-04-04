import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { DbModule } from '../db/db.module';
import { CategoryModule } from '../category/category.module';
import { GenreModule } from '../genre/genre.module';
import { CastMemberModule } from '../cast-member/cast-member.module';

@Module({
  imports: [DbModule, CategoryModule, GenreModule, CastMemberModule],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MovieModule {}
