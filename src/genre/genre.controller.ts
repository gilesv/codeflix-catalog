import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, NotFoundException } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Controller('genres')
@UsePipes(new ValidationPipe())
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  async create(@Body() createGenreDto: CreateGenreDto) {
    return await this.genreService.create(createGenreDto);
  }

  @Get()
  async findAll() {
    return await this.genreService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let genre = await this.genreService.findOne(id);
    if (!genre) {
      throw new NotFoundException();
    }
    return genre;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return await this.genreService.update(id, updateGenreDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.genreService.remove(id);
  }
}
