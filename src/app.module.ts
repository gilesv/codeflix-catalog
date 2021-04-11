import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { GenreModule } from './genre/genre.module';
import { CastMemberModule } from './cast-member/cast-member.module';
import { MovieModule } from './movie/movie.module';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CategoryModule,
    GenreModule,
    CastMemberModule,
    MovieModule,
    UploadModule
  ],
})
export class AppModule {}
