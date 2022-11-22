import { Module } from '@nestjs/common';
import { IssueService } from './issue.service';
import { IssueController } from '@app/issue/issue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueEntity } from '@app/issue/models/issue.entity';
import { UserEntity } from '@app/user/models/user.entity';
import { AuthGuard } from '@app/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([IssueEntity, UserEntity])],
  providers: [IssueService, AuthGuard],
  controllers: [IssueController],
})
export class IssueModule {}
