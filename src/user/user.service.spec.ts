import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { Repository } from 'typeorm';
import { UserService } from '@app/user/user.service';
import { UserEntity } from '@app/user/models/user.entity';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(UserEntity);

  const createUserDtoTest = {
    username: 'ruslanpostoiuk171',
    email: 'ruslanpostoiuk171@gmail.com',
    password: '123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            save: jest.fn,
            findOne: jest.fn,
          },
        },
      ],
    }).compile();
    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(USER_REPOSITORY_TOKEN);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  });
});
