import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { DbModule } from '../db/db.module';
import { CategoryModule } from '../category/category.module';
import { GenreModule } from '../genre/genre.module';
import { CastMemberModule } from '../cast-member/cast-member.module';
import { UploadModule } from '../upload/upload.module';
import { MovieFileService } from './movie-file.service';

@Module({
  imports: [
    DbModule,
    CategoryModule,
    GenreModule,
    CastMemberModule,
    UploadModule,
  ],
  controllers: [MovieController],
  providers: [MovieService, MovieFileService]
})
export class MovieModule {}
