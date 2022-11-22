import { Module } from '@nestjs/common';
import { IssueService } from './issue.service';
import { IssueController } from '@app/issue/issue.controller';

@Module({
  providers: [IssueService],
  controllers: [IssueController],
})
export class IssueModule {}
