import { Body, Controller, Post } from '@nestjs/common';
import {
  UserRegistrationReqBodyDTO,
  UserRegistrationResDTO,
} from './dtos/user-registration.dto';
import { UsersService } from './users.service';
import { SuccessResponse } from 'src/commons/interfaces';
import { GrpcMethod } from '@nestjs/microservices';
import { GetUserReqDto, GetUserResDto } from './dtos/get-user.dto';
import { ValidateGrpcInput } from 'src/commons/decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async postUserRegistration(
    @Body() body: UserRegistrationReqBodyDTO,
  ): Promise<SuccessResponse<UserRegistrationResDTO>> {
    const resultData = await this.usersService.postUserRegistration(body);

    return {
      message: 'User registered successfully',
      data: resultData,
    };
  }

  @GrpcMethod('UsersService', 'getUserById')
  @ValidateGrpcInput(GetUserReqDto)
  public async getUserById(data: GetUserReqDto): Promise<GetUserResDto> {
    return this.usersService.getUserById(data);
  }
}
