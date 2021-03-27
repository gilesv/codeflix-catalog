import { Category } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private db: DbService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    let { name, description } = createCategoryDto;
    let category = await this.db.category.create({
      data: { name, description }
    });
    return category;
  }

  async findAll(): Promise<Category[]> {
    return await this.db.category.findMany({
      where: { isActive: true }
    });
  }

  async findOne(id: string): Promise<Category> {
    return await this.db.category.findFirst({
      where: { id }
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    await this.checkNotFound(id);
    let { name, description } = updateCategoryDto;
    return await this.db.category.update({
      where: { id },
      data: { name, description }
    });
  }

  async remove(id: string): Promise<Category> {
    await this.checkNotFound(id);
    return await this.db.category.update({
      where: { id },
      data: { isActive: false }
    });
  }

  private async checkNotFound(id: string) {
    let category = await this.findOne(id);

    if (!category) {
      throw new NotFoundException("Category not found");
    }
  }
}
