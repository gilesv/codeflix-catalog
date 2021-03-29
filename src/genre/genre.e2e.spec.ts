import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GenreModule } from './genre.module';
import { GenreService } from './genre.service';
import GenreFactory from './genre.factory';
import { CreateGenreDto } from './dto/create-genre.dto';

describe('Genre endpoint', () => {
  let module: TestingModule;
  let app: INestApplication;
  let genreService = {
    create: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  };

  beforeAll(async () => {
    module = await Test
      .createTestingModule({ imports: [GenreModule] })
      .overrideProvider(GenreService).useValue(genreService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /genres', () => {
    it('returns 200 with empty array', async () => {
      jest.spyOn(genreService, 'findAll').mockResolvedValueOnce([]);
      await request(app.getHttpServer())
        .get('/genres')
        .expect(HttpStatus.OK)
        .expect([]);
    });

    it('returns 200 with all genres', async () => {
      let genres = GenreFactory.list();
      jest.spyOn(genreService, 'findAll').mockResolvedValueOnce(genres);
      await request(app.getHttpServer())
        .get('/genres')
        .expect(HttpStatus.OK)
        .expect(JSON.stringify(genres));
    });
  });

  describe('GET /genres/:id', () => {
    it('returns 200 with existing genre', async () => {
      let genre = GenreFactory.new();
      jest.spyOn(genreService, 'findOne').mockResolvedValueOnce(genre);
      let id = '000-000-000-000';
      await request(app.getHttpServer())
        .get(`/genres/${id}`)
        .expect(HttpStatus.OK)
        .expect(JSON.stringify(genre));

      expect(genreService.findOne).toBeCalledWith(id);
    });

    it('returns 404 if not found', async () => {
      jest.spyOn(genreService, 'findOne').mockResolvedValueOnce(null);

      let id = '000-000-000-000';
      await request(app.getHttpServer())
        .get(`/genres/${id}`)
        .expect(HttpStatus.NOT_FOUND)

      expect(genreService.findOne).toBeCalledWith(id);
    })
  });

  describe('POST /genres', () => {
    it('creates a new genre', async () => {
      let createDto = new CreateGenreDto();
      createDto.name = "Action";

      let genreResult = GenreFactory.new(createDto.name);
      jest.spyOn(genreService, 'create').mockResolvedValueOnce(genreResult);

      await request(app.getHttpServer())
        .post('/genres')
        .send(createDto)
        .expect(HttpStatus.CREATED)
        .expect(JSON.stringify(genreResult));
      
      expect(genreService.create).toHaveBeenCalledWith(createDto);
    });

    it('throws error if payload is incomplete', async () => {
      let createDto = new CreateGenreDto();
      createDto.name = null;

      await request(app.getHttpServer())
        .post('/genres')
        .send(createDto)
        .expect(HttpStatus.BAD_REQUEST)
    });
  });
});
