import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { AuthenticationsService } from './authentications.service';
import { UserLoginReqBodyDTO } from './dto/user-login.dto';
import { SuccessResponse } from 'src/commons/interfaces';
import { AuthenticationTokens } from 'src/commons/tokens/jwt.interface';
import { UserLogoutReqBodyDTO } from './dto/user-logout.dto';
import {
  TokenRotationReqBodyDTO,
  TokenRotationResponse,
} from './dto/token-rotation.dto';

@Controller('authentications')
export class AuthenticationsController {
  constructor(
    private readonly authenticationsService: AuthenticationsService,
  ) {}

  @Post()
  public async postUserLogin(
    @Body() payload: UserLoginReqBodyDTO,
  ): Promise<SuccessResponse<AuthenticationTokens>> {
    const result = await this.authenticationsService.postUserLogin(payload);

    return {
      message: 'User logged in successfully',
      data: result,
    };
  }

  @Put()
  public async putTokenRotation(
    @Body() payload: TokenRotationReqBodyDTO,
  ): Promise<SuccessResponse<TokenRotationResponse>> {
    const result = await this.authenticationsService.putTokenRotation(payload);

    return {
      message: 'Token rotated successfully',
      data: result,
    };
  }

  @Delete()
  public async deleteUserLogout(
    @Body() payload: UserLogoutReqBodyDTO,
  ): Promise<SuccessResponse<void>> {
    await this.authenticationsService.deleteUserLogout(payload);

    return {
      message: 'User logged out successfully',
    };
  }
}
