import { IsString } from 'class-validator';

export class UserLoginReqBodyDTO {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
