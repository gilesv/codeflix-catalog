import { CastMember } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateCastMemberDto } from './dto/create-cast-member.dto';
import { UpdateCastMemberDto } from './dto/update-cast-member.dto';

@Injectable()
export class CastMemberService {
  constructor(private db: DbService) {}

  async create(createCastMemberDto: CreateCastMemberDto): Promise<CastMember> {
    let { name, type } = createCastMemberDto;
    let castMember = await this.db.castMember.create({
      data: { name, type }
    });
    return castMember;
  }

  async findAll(): Promise<CastMember[]> {
    return await this.db.castMember.findMany({
      where: { isActive: true }
    });
  }

  async findOne(id: string): Promise<CastMember> {
    return await this.db.castMember.findFirst({
      where: { id }
    });
  }

  async update(id: string, updateCastMemberDto: UpdateCastMemberDto): Promise<CastMember> {
    await this.checkNotFound(id);
    let { name, type } = updateCastMemberDto;
    return await this.db.castMember.update({
      where: { id },
      data: { name, type }
    });
  }

  async remove(id: string): Promise<CastMember> {
    await this.checkNotFound(id);
    return await this.db.castMember.update({
      where: { id },
      data: { isActive: false }
    });
  }

  private async checkNotFound(id: string) {
    let genre = await this.findOne(id);

    if (!genre) {
      throw new NotFoundException("CastMember not found");
    }
  }
}
