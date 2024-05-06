import { IsString } from 'class-validator';

export class TokenRotationReqBodyDTO {
  @IsString()
  refreshToken: string;
}

export class TokenRotationResponse {
  accessToken: string;
}
