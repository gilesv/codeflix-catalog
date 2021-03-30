import { Test, TestingModule } from '@nestjs/testing';
import { DbService } from '../db/db.service';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let movieService: MovieService;
  let dbService: DbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieService, DbService],
    }).compile();

    movieService = module.get<MovieService>(MovieService);
    dbService = module.get<DbService>(DbService);
  });

  it('should be defined', () => {
    expect(movieService).toBeDefined();
  });
});
