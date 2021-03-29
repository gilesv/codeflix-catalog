import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryModule } from './category.module';
import { CategoryService } from './category.service';
import CategoryFactory from './category.factory';
import { CreateCategoryDto } from './dto/create-category.dto';

describe('CategoryController', () => {
  let module: TestingModule;
  let app: INestApplication;
  let categoryService = {
    create: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  };

  beforeAll(async () => {
    module = await Test
      .createTestingModule({ imports: [CategoryModule] })
      .overrideProvider(CategoryService).useValue(categoryService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /categories', () => {
    it('returns 200 with empty array', async () => {
      jest.spyOn(categoryService, 'findAll').mockResolvedValueOnce([]);
      await request(app.getHttpServer())
        .get(`/categories`)
        .expect(HttpStatus.OK)
        .expect([]);
    });
    it('returns 200 with all categories', async () => {
      let categories = CategoryFactory.list();
      jest.spyOn(categoryService, 'findAll').mockResolvedValueOnce(categories);
      await request(app.getHttpServer())
        .get(`/categories`)
        .expect(HttpStatus.OK)
        .expect(JSON.stringify(categories));
    });
  });

  describe('GET /categories/:id', () => {
    it('returns 200 with existing category', async () => {
      let category = CategoryFactory.new();
      jest.spyOn(categoryService, 'findOne').mockResolvedValueOnce(category);
      let id = '000-000-000-000';
      await request(app.getHttpServer())
        .get(`/categories/${id}`)
        .expect(HttpStatus.OK)
        .expect(JSON.stringify(category));

      expect(categoryService.findOne).toBeCalledWith(id);
    });

    it('returns 404 if not found', async () => {
      jest.spyOn(categoryService, 'findOne').mockResolvedValueOnce(null);

      let id = '000-000-000-000';
      await request(app.getHttpServer())
        .get(`/categories/${id}`)
        .expect(HttpStatus.NOT_FOUND)

      expect(categoryService.findOne).toBeCalledWith(id);
    })
  });

  describe('POST /categories', () => {
    it('creates a new category', async () => {
      let createDto = new CreateCategoryDto();
      createDto.name = "Action";
      createDto.description = "Action movies";

      let categoryResult = CategoryFactory.new(createDto.name, createDto.description);
      jest.spyOn(categoryService, 'create').mockResolvedValueOnce(categoryResult);

      await request(app.getHttpServer())
        .post('/categories')
        .send(createDto)
        .expect(HttpStatus.CREATED)
        .expect(JSON.stringify(categoryResult));
      
      expect(categoryService.create).toHaveBeenCalledWith(createDto);
    });

    it('throws error if payload is incomplete', async () => {
      let createDto = new CreateCategoryDto();
      createDto.name = null;
      createDto.description = "description";

      await request(app.getHttpServer())
        .post('/categories')
        .send(createDto)
        .expect(HttpStatus.BAD_REQUEST)
    });
  });
});
