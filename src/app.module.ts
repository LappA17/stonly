import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '@app/orm.config';
import { UserModule } from '@app/user/user.module';
import { IssueModule } from '@app/issue/issue.module';
import { AuthMiddleware } from '@app/middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), UserModule, IssueModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
