import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { GenreModule } from './genre/genre.module';
import { CastMemberModule } from './cast-member/cast-member.module';

@Module({
  imports: [CategoryModule, GenreModule, CastMemberModule],
})
export class AppModule {}
