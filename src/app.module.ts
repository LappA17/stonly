import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { IssueController } from './issue/issue.controller';
import { IssueModule } from './issue/issue.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '@app/config/orm.config';
import { AuthMiddleware } from '@app/middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), UserModule, IssueModule],
  controllers: [IssueController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
