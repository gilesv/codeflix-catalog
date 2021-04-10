import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, NotFoundException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ConfigService } from '@nestjs/config';
@Controller('movies')
@UsePipes(new ValidationPipe())
export class MovieController {
  constructor(private readonly movieService: MovieService, private configService: ConfigService) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    return await this.movieService.create(createMovieDto);
  }

  @Get()
  async findAll() {
    return await this.movieService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let movie = await this.movieService.findOne(id);
    if (!movie) {
      throw new NotFoundException();
    }
    return movie;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return await this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.movieService.remove(id);
  }
}
