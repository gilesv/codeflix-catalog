import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import GenreFactory from '../genre/genre.factory';
import { GenreService } from '../genre/genre.service';
import CategoryFactory from '../category/category.factory';
import { CategoryService } from '../category/category.service';
import { DbService } from '../db/db.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import MovieFactory from './movie.factory';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let movieService: MovieService;
  let categoryService: CategoryService;
  let genreService: GenreService;
  let dbService: DbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieService, DbService, CategoryService, GenreService],
    }).compile();

    movieService = module.get<MovieService>(MovieService);
    categoryService = module.get<CategoryService>(CategoryService);
    genreService = module.get<GenreService>(GenreService);
    dbService = module.get<DbService>(DbService);
  });

  it('should be defined', () => {
    expect(movieService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new movie', async () => {
      let movie = MovieFactory.new();
      jest.spyOn(dbService.movie, 'create').mockResolvedValueOnce(movie);
      jest.spyOn(categoryService, 'findOne').mockResolvedValue(CategoryFactory.new());
      jest.spyOn(genreService, 'findOne').mockResolvedValue(GenreFactory.new());
      
      let dto = new CreateMovieDto();
      dto.categories = ["000-000-000-0AB", "000-000-000-0AC"];
      dto.genres = ["zzz0z00z00", "ababbbbbaa"];

      let result = await movieService.create(dto);
      expect(dbService.movie.create).toHaveBeenCalled();
      expect(result).toBe(movie);
    });

    it('should throw error if any provided category does not exist', async () => {
      jest.spyOn(dbService.movie, 'create').mockImplementation(jest.fn());
      jest.spyOn(categoryService, 'findOne').mockResolvedValueOnce(null);
      let dto = new CreateMovieDto();
      dto.categories = ["000-000-000-0AB"];
      dto.genres = [];

      await expect(movieService.create(dto)).rejects.toThrowError(NotFoundException);
      expect(dbService.movie.create).toHaveBeenCalledTimes(0);
    });

    it('should throw error if any provided genre does not exist', async () => {
      jest.spyOn(dbService.movie, 'create').mockImplementation(jest.fn());
      jest.spyOn(genreService, 'findOne').mockResolvedValueOnce(null);
      let dto = new CreateMovieDto();
      dto.categories = [];
      dto.genres = ["000-000-000-0AB"];

      await expect(movieService.create(dto)).rejects.toThrowError(NotFoundException);
      expect(dbService.movie.create).toHaveBeenCalledTimes(0);
    });
  })

  it('findAll should list all movies', async () => {
    let movies = MovieFactory.list();
    jest.spyOn(dbService.movie, 'findMany')
      .mockResolvedValueOnce(movies);
    let result = await movieService.findAll();
    expect(result).toBe(movies);
  });

  it('findOne should find one movie', async () => {
    let movie = MovieFactory.new();
    jest.spyOn(dbService.movie, 'findUnique')
      .mockResolvedValueOnce(movie);
    let result = await movieService.findOne('0000-0000-0000-0001');
    expect(result).toBe(movie);
  });

  describe('update', () => {
    it('should update a movie', async () => {
      let movie = MovieFactory.new('Movie A');
      let result = MovieFactory.new('Movie B');

      jest.spyOn(dbService.movie, 'findUnique').mockResolvedValueOnce(movie);
      jest.spyOn(dbService.movie, 'update').mockResolvedValueOnce(result as any);

      expect(await movieService.update('cat123', new UpdateMovieDto())).toBe(result);
   });

    it('should throw error if tries to update a not found movie', async () => {
      jest.spyOn(dbService.movie, 'findUnique').mockResolvedValueOnce(null);

      await expect(movieService.update('cat123', new UpdateMovieDto()))
        .rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a movie', async () => {
      jest.spyOn(dbService.movie, 'update').mockImplementation(jest.fn());
      jest.spyOn(dbService.movie, 'findUnique').mockResolvedValueOnce(MovieFactory.new());

      await movieService.remove('000-000-000-001');
      expect(dbService.movie.update).toHaveBeenCalledWith({
        where: { id: '000-000-000-001' },
        data: { isActive: false }
      });
    });

    it('should throw error if tries to remove a not found movie', async () => {
      jest.spyOn(dbService.movie, 'update').mockImplementation(jest.fn());
      jest.spyOn(dbService.movie, 'findUnique').mockResolvedValueOnce(null);

      await expect(movieService.remove('000-000-000-001'))
        .rejects.toThrow(NotFoundException);
    });
  });
});
