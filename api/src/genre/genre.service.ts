import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { Genre } from '@prisma/client';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenreService {
  constructor(private db: DbService) {}

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    let { name } = createGenreDto;
    let genre = await this.db.genre.create({
      data: { name }
    });
    return genre;
  }

  async findAll(): Promise<Genre[]> {
    return await this.db.genre.findMany({
      where: { isActive: true }
    });
  }

  async findOne(id: string): Promise<Genre> {
    return await this.db.genre.findFirst({
      where: { id }
    });
  }

  async update(id: string, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    await this.checkNotFound(id);
    let { name } = updateGenreDto;
    return await this.db.genre.update({
      where: { id },
      data: { name }
    });
  }

  async remove(id: string): Promise<Genre> {
    await this.checkNotFound(id);
    return await this.db.genre.update({
      where: { id },
      data: { isActive: false }
    });
  }

  private async checkNotFound(id: string) {
    let genre = await this.findOne(id);

    if (!genre) {
      throw new NotFoundException("Genre not found");
    }
  }
}
