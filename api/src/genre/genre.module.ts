import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  exports: [GenreService],
  controllers: [GenreController],
  providers: [GenreService]
})
export class GenreModule {}
