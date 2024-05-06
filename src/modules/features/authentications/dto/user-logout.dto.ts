import { IsString } from 'class-validator';

export class UserLogoutReqBodyDTO {
  @IsString()
  refreshToken: string;
}
