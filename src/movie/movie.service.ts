import { Movie } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(private db: DbService) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    let { title, synopsis, releaseYear, isAvailable } = createMovieDto;
    return await this.db.movie.create({
      data: {
        title,
        synopsis,
        releaseYear: Number(releaseYear),
        isAvailable: Boolean(isAvailable),
      }
    })
  }

  async findAll(): Promise<Movie[]> {
    return await this.db.movie.findMany({
      where: { isActive: true }
    });
  }

  async findOne(id: string): Promise<Movie|null> {
    return await this.db.movie.findUnique({
      where: { id }
    });
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie|null>{
    await this.checkNotFound(id);
    let { title, synopsis, releaseYear, isAvailable } = updateMovieDto;
    //TODO: fix isAvailable
    return await this.db.movie.update({
      where: { id },
      data: {
        title,
        synopsis,
        releaseYear: releaseYear ? Number(releaseYear) : undefined,
        isAvailable: isAvailable ? Boolean(isAvailable) : undefined,
      }
    });
  }

  async remove(id: string): Promise<Movie|null> {
    await this.checkNotFound(id);
    return await this.db.movie.update({
      where: { id },
      data: { isActive: false },
    });
  }

  private async checkNotFound(id: string) {
    let movie = await this.findOne(id);

    if (!movie) {
      throw new NotFoundException("Movie not found");
    }
  }
}
