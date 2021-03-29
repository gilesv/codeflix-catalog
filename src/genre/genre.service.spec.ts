import { Test, TestingModule } from '@nestjs/testing';
import { GenreService } from './genre.service';
import { DbService } from '../db/db.service';
import { Genre } from '.prisma/client';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateCategoryDto } from 'src/category/dto/update-category.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

function NewGenre(name: string = 'Genre', isActive: boolean = true): Genre {
  return {
    id: 'ABCD-0000-1111-2222',
    name,
    isActive,
    createdAt: new Date(),
    updatedAt: null,
  };
}

describe('GenreService', () => {
  let genreService: GenreService;
  let dbService: DbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenreService, DbService],
    }).compile();

    genreService = module.get<GenreService>(GenreService);
    dbService = module.get<DbService>(DbService);
  });

  it('should be defined', () => {
    expect(genreService).toBeDefined();
  });

  describe('create',  () => {
    it('should create a new genre', async () => {
      let genre = NewGenre();
      jest.spyOn(dbService.genre, 'create').mockResolvedValueOnce(genre);
      expect(await genreService.create(new CreateGenreDto())).toBe(genre);
    })
  });

  describe('find', () => {
    it('one', async () => {
      let genre = NewGenre();
      jest.spyOn(dbService.genre, 'findFirst').mockResolvedValueOnce(genre);
      expect(await genreService.findOne('abc')).toBe(genre);
    });

    it('all', async () => {
      let result = [NewGenre(), NewGenre(), NewGenre()];
      jest.spyOn(dbService.genre, 'findMany').mockResolvedValueOnce(result);
      expect(await genreService.findAll()).toBe(result);
    });
  });

  describe('update', () => {
    it('should update existent genre', async () => {
      let genre = NewGenre('A');
      let result = NewGenre('b');
      jest.spyOn(dbService.genre, 'findFirst').mockResolvedValueOnce(genre);
      jest.spyOn(dbService.genre, 'update').mockResolvedValueOnce(result);

      expect(await genreService.update(genre.id, new UpdateGenreDto()))
        .toBe(result);
    });

    it('should throw if genre does not exist', async () => {
      jest.spyOn(dbService.genre, 'findFirst').mockResolvedValueOnce(null);
      await expect(genreService.update('abc', new UpdateGenreDto())).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove existent genre', async () => {
      jest.spyOn(dbService.genre, 'update').mockImplementation(jest.fn());
      jest.spyOn(dbService.genre, 'findFirst').mockResolvedValueOnce(NewGenre());

      await genreService.remove('000-000-000-001');
      expect(dbService.genre.update).toHaveBeenCalledWith({
        where: { id: '000-000-000-001' },
        data: { isActive: false }
      });
    });

    it('should throw if genre does not exist', async () => {
      jest.spyOn(dbService.genre, 'findFirst').mockResolvedValueOnce(null);
      await expect(genreService.remove('abc')).rejects.toThrow();
    });
  });
});
