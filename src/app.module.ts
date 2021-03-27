import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { GenreModule } from './genre/genre.module';

@Module({
  imports: [CategoryModule, GenreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
