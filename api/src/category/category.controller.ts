import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, NotFoundException } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
@UsePipes(new ValidationPipe())
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let category = await this.categoryService.findOne(id);
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
