import { Test, TestingModule } from '@nestjs/testing';
import { DbModule } from '../db/db.module';
import { CastMemberService } from './cast-member.service';

describe('CastMemberService', () => {
  let service: CastMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DbModule],
      providers: [CastMemberService],
    }).compile();

    service = module.get<CastMemberService>(CastMemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
