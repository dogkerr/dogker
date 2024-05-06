import { hash } from 'argon2';
import { status } from '@grpc/grpc-js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { GetUserReqDto, GetUserResDto } from './dtos/get-user.dto';
import { User } from 'src/modules/datasources/entities/users.entity';
import { UsersRepository } from 'src/modules/datasources/repositories/users.repository';
import {
  UserRegistrationReqBodyDTO,
  UserRegistrationResDTO,
} from './dtos/user-registration.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly configService: ConfigService,
  ) {}

  public async postUserRegistration(
    payload: UserRegistrationReqBodyDTO,
  ): Promise<UserRegistrationResDTO> {
    const { email, username } = payload;

    await this.usersRepository.validateUseDuplicationrByEmailAndUsername(
      email,
      username,
    );

    const newUser = new User();
    newUser.fullname = payload.fullname;
    newUser.email = email;
    newUser.username = username;
    newUser.password = await this.hashPassword(payload.password);

    const addedUser = await this.usersRepository.save(newUser);

    const responseDto = new UserRegistrationResDTO();

    responseDto.user = {
      id: addedUser.id,
    };

    return responseDto;
  }

  public async getUserById(data: GetUserReqDto): Promise<GetUserResDto> {
    try {
      console.log('called');
      const { id } = data;
      const user = await this.usersRepository.findOneBy({ id });

      if (!user) {
        throw new RpcException({
          code: status.NOT_FOUND,
          message: 'User not found',
        });
      }

      const result = new GetUserResDto();
      result.id = user.id;
      result.email = user.email;
      result.fullname = user.fullname;
      result.username = user.username;

      return result;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
      throw new RpcException({
        code: status.INTERNAL,
        message: 'Internal server error',
      });
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return hash(password, {
      salt: this.configService.get<string>('PASSWORD_SALT'),
    });
  }
}
