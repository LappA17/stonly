import { Request } from 'express';
import { UserEntity } from '@app/user/models/user.entity';

export interface ExpressRequest extends Request {
  user?: UserEntity | null;
}
