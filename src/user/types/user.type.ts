import { UserEntity } from '@app/user/models/user.entity';

export type UserType = Omit<UserEntity, 'hashPassword'>;
