import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { IErrorResponse } from '@app/types/errorResponse.interface';
import { LoginUserDto } from '@app/user/dto/login-user.dto';
import { UpdateUserDto } from '@app/user/dto/update-user.dto';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';
import { UserEntity } from '@app/user/models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const errorResponse: IErrorResponse = {
      errors: {},
    };
    const userByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    const userByUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (userByEmail) {
      errorResponse.errors['email'] = 'has already exist';
    }
    if (userByUsername) {
      errorResponse.errors['username'] = 'has already exist';
    }
    if (userByEmail || userByUsername)
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const errorResponse: IErrorResponse = {
      errors: {
        'email or password': 'is invalid',
      },
    };
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
      select: ['id', 'username', 'email', 'password'],
    });
    if (!user) throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    const isPasswordCorrect = await compare(loginUserDto.password, user.password);
    if (!isPasswordCorrect) throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    return user;
  }

  async findById(id: number): Promise<UserEntity | null> {
    const user = this.userRepository.findOne({ where: { id } });
    if (user === null)
      throw new HttpException('User not found by id', HttpStatus.UNPROCESSABLE_ENTITY);
    return user;
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findById(userId);
    if (!user) throw new HttpException('User not found in Login', HttpStatus.UNPROCESSABLE_ENTITY);
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  generateJwt({ id, username, email }: UserEntity): string {
    return sign(
      {
        id: id,
        username,
        email,
      },
      process.env.JWT_SECRET ?? 'secret',
    );
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}
