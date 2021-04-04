import { Module } from '@nestjs/common';
import { CastMemberService } from './cast-member.service';
import { CastMemberController } from './cast-member.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  exports: [CastMemberService],
  controllers: [CastMemberController],
  providers: [CastMemberService]
})
export class CastMemberModule {}
