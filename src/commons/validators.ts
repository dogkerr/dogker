import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function validatePassword(password: string): boolean {
  const regex = /^(?=.*?[_()#?!@$%^&-])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d).{8,}$/;
  return regex.test(password);
}

@ValidatorConstraint({ name: 'passwordExist', async: true })
@Injectable()
export class PasswordValidator implements ValidatorConstraintInterface {
  public async validate(value: string): Promise<boolean> {
    return validatePassword(value);
  }

  public defaultMessage(): string {
    return `Password should contains at least 1 uppercase, 
    1 lowercase, 1 special char, 1 number and minimal length 8`;
  }
}
