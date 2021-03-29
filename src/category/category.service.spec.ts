import { Category } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { DbService } from '../db/db.service';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { NotFoundException } from '@nestjs/common';
import CategoryFactory from './category.factory';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let dbService: DbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ CategoryService, DbService ],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
    dbService = module.get<DbService>(DbService);
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
  });

  it('create should create a new category', async () => {
    let category = CategoryFactory.new();
    jest.spyOn(dbService.category, 'create')
      .mockResolvedValueOnce(category as any);

    let result = await categoryService.create(new CreateCategoryDto());
    expect(result).toBe(category);
  });

  it('findAll should list all categories', async () => {
    let categories = [CategoryFactory.new(), CategoryFactory.new(), CategoryFactory.new()];
    jest.spyOn(dbService.category, 'findMany')
      .mockResolvedValueOnce(categories as any);

    let result = await categoryService.findAll();
    expect(result).toBe(categories);
  });

  it('findOne should find one category', async () => {
    let category = CategoryFactory.new();

    jest.spyOn(dbService.category, 'findFirst')
      .mockResolvedValueOnce(category as any);

    let result = await categoryService.findOne('000-000-000-000');
    expect(result).toBe(category);
  });

  describe('update', () => {
    it('should update a category', async () => {
      let category = CategoryFactory.new('Category A');
      let result = CategoryFactory.new('Category B');

      jest.spyOn(dbService.category, 'findFirst').mockResolvedValueOnce(category as any);
      jest.spyOn(dbService.category, 'update').mockResolvedValueOnce(result as any);

      expect(await categoryService.update('cat123', new UpdateCategoryDto())).toBe(result);
    });

    it('should throw error if tries to update a not found category', async () => {
      jest.spyOn(dbService.category, 'findFirst').mockResolvedValueOnce(null);

      await expect(categoryService.update('cat123', new UpdateCategoryDto()))
        .rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      jest.spyOn(dbService.category, 'update').mockImplementation(jest.fn());
      jest.spyOn(dbService.category, 'findFirst').mockResolvedValueOnce(CategoryFactory.new());

      await categoryService.remove('000-000-000-001');
      expect(dbService.category.update).toHaveBeenCalledWith({
        where: { id: '000-000-000-001' },
        data: { isActive: false }
      });
    });

    it('should throw error if tries to remove a not found category', async () => {
      jest.spyOn(dbService.category, 'update').mockImplementation(jest.fn());
      jest.spyOn(dbService.category, 'findFirst').mockResolvedValueOnce(null);

      await expect(categoryService.remove('000-000-000-001'))
        .rejects.toThrow(NotFoundException);
    });
  });
});
