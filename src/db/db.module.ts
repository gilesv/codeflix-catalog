import { Module } from '@nestjs/common';
import { DbService } from './db.service';

@Module({
  imports: [],
  providers: [DbService],
})
export class DbModule {}
