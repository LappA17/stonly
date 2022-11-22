import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '@app/user/models/user.entity';
import { AuthGuard } from '@app/guards/auth.guard';
import { UserService } from '@app/user/user.service';
import { UserController } from '@app/user/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, AuthGuard],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
