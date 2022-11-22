import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { IssueController } from './issue/issue.controller';
import { IssueModule } from './issue/issue.module';

@Module({
  imports: [UserModule, IssueModule],
  controllers: [IssueController],
})
export class AppModule {}
