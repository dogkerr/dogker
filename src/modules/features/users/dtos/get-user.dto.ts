import { IsUUID } from 'class-validator';

export class GetUserReqDto {
  @IsUUID()
  id: string;
}

export class GetUserResDto {
  id: string;
  email: string;
  fullname: string;
  username: string;
}
