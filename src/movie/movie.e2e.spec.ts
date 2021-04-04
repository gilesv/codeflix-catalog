import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MovieModule } from './movie.module';
import { MovieService } from './movie.service';
import MovieFactory from './movie.factory';

describe('Movie endpoint', () => {
  let module: TestingModule;
  let app: INestApplication;
  let movieService = {
    create: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  };

  beforeAll(async () => {
    module = await Test
      .createTestingModule({ imports: [MovieModule] })
      .overrideProvider(MovieService).useValue(movieService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    movieService.create.mockReset();
    movieService.findOne.mockReset();
    movieService.findAll.mockReset();
    movieService.update.mockReset();
    movieService.remove.mockReset();
  })

  describe('GET /movies', () => {
    it('returns 200 with all movies', async () => {
      let movies = MovieFactory.list();
      jest.spyOn(movieService, 'findAll').mockResolvedValueOnce(movies);
      await request(app.getHttpServer())
        .get(`/movies`)
        .expect(HttpStatus.OK)
        .expect(JSON.stringify(movies));
      expect(movieService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /movies/:id', () => {
    it('returns 200 with existing movie', async () => {
      let movie = MovieFactory.new();
      jest.spyOn(movieService, 'findOne').mockResolvedValueOnce(movie);
      let id = '000-000-000-000';
      await request(app.getHttpServer())
        .get(`/movies/${id}`)
        .expect(HttpStatus.OK)
        .expect(JSON.stringify(movie));

      expect(movieService.findOne).toBeCalledWith(id);
    });

    it('returns 404 if not found', async () => {
      jest.spyOn(movieService, 'findOne').mockResolvedValueOnce(null);

      let id = '000-000-000-000';
      await request(app.getHttpServer())
        .get(`/movies/${id}`)
        .expect(HttpStatus.NOT_FOUND)

      expect(movieService.findOne).toBeCalledWith(id);
    })
  });

  describe('POST /movies', () => {
    it('creates a new movie', async () => {
      let payload = {
        title: "action movie",
        synopsis: "heheh, dunno",
        releaseYear: 2021,
        isAvailable: true,
        categories: ["abc123", "def123"],
        genres: ["abc123", "agua"],
        castMembers: ["egua", "kvalu"],
      };

      let result = MovieFactory.new();
      jest.spyOn(movieService, 'create').mockResolvedValueOnce(result);

      await request(app.getHttpServer())
        .post('/movies')
        .send(payload)
        .expect(HttpStatus.CREATED)
        .expect(JSON.stringify(result));
      
      expect(movieService.create).toHaveBeenCalled();
    });

    it('throws error if payload is incomplete or incorrect', async () => {
      let payload = {
        title: null,
        synopsis: null,
        releaseYear: true,
        isAvailable: 123,
        categories: "hey",
        genres: undefined,
      };
      await request(app.getHttpServer())
        .post('/movies')
        .send(payload)
        .expect(HttpStatus.BAD_REQUEST)
      expect(movieService.create).toHaveBeenCalledTimes(0);
    });
  });
});
