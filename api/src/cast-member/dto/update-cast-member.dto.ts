import { PartialType } from '@nestjs/mapped-types';
import { CreateCastMemberDto } from './create-cast-member.dto';

export class UpdateCastMemberDto extends PartialType(CreateCastMemberDto) {}
