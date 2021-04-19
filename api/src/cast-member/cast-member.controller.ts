import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CastMemberService } from './cast-member.service';
import { CreateCastMemberDto } from './dto/create-cast-member.dto';
import { UpdateCastMemberDto } from './dto/update-cast-member.dto';

@Controller('cast-members')
@UsePipes(new ValidationPipe())
export class CastMemberController {
  constructor(private readonly castMemberService: CastMemberService) {}

  @Post()
  async create(@Body() createCastMemberDto: CreateCastMemberDto) {
    return await this.castMemberService.create(createCastMemberDto);
  }

  @Get()
  async findAll() {
    return this.castMemberService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.castMemberService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCastMemberDto: UpdateCastMemberDto) {
    return this.castMemberService.update(id, updateCastMemberDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.castMemberService.remove(id);
  }
}
