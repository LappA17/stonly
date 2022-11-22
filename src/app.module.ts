import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { IssueController } from './issue/issue.controller';
import { IssueModule } from './issue/issue.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '@app/config/orm.config';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), UserModule, IssueModule],
  controllers: [IssueController],
})
export class AppModule {}
