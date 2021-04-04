import { Movie } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CategoryService } from '../category/category.service';
import { GenreService } from '../genre/genre.service';

@Injectable()
export class MovieService {
  constructor(
    private db: DbService,
    private categoryService: CategoryService,
    private genreService: GenreService
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    let categories = await this.processCategories(createMovieDto.categories);
    let genres = await this.processGenres(createMovieDto.genres);

    return await this.db.movie.create({
      data: {
        title: createMovieDto.title,
        synopsis: createMovieDto.synopsis,
        releaseYear: createMovieDto.releaseYear,
        isAvailable: createMovieDto.isAvailable,
        categories: { connect: categories },
        genres: { connect: genres },
      },
      include: {
        categories: {
          select: { id: true, name: true }
        },
        genres: {
          select: { id: true, name: true }
        }
      }
    });
  }

  private async processCategories(categoryIds: string[]): Promise<{ id: string }[]> {
    let categories = [];
    for (let categoryId of categoryIds) {
      let exists = await this.categoryService.findOne(categoryId);
      if (!exists) {
        throw new NotFoundException(`Category with id '${categoryId}' not found`);
      } 
      categories.push({ id: categoryId });
    }
    return categories;
  }

  private async processGenres(genreIds: string[]): Promise<{ id: string }[]> {
    let genres = [];
    for (let genreId of genreIds) {
      let exists = await this.genreService.findOne(genreId)
      if (!exists) {
        throw new NotFoundException(`Genre with id '${genreId}' not found`);
      } 
      genres.push({ id: genreId });
    }
    return genres;
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
