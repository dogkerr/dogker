import { IsEmail, IsString, Validate } from 'class-validator';
import { PasswordValidator } from 'src/commons/validators';

export class UserRegistrationReqBodyDTO {
  @IsString()
  fullname: string;

  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @Validate(PasswordValidator)
  password: string;
}

export class UserRegistrationResDTO {
  user: { id: string };
}
