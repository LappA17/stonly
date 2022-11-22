import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IssueService } from '@app/issue/issue.service';
import { IssueEntity } from '@app/issue/models/issue.entity';
import { UserEntity } from '@app/user/models/user.entity';
import { AuthGuard } from '@app/guards/auth.guard';
import { IssueController } from '@app/issue/issue.controller';

@Module({
  imports: [TypeOrmModule.forFeature([IssueEntity, UserEntity])],
  providers: [IssueService, AuthGuard],
  controllers: [IssueController],
})
export class IssueModule {}
