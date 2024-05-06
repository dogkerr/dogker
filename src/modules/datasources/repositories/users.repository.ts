import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async validateUseDuplicationrByEmailAndUsername(
    email: string,
    username: string,
  ): Promise<void> {
    const user = await this.createQueryBuilder('u')
      .where('u.email = :email', { email })
      .orWhere('u.username = :username', { username })
      .getOne();

    if (user?.email === email)
      throw new BadRequestException('Email already in use');

    if (user?.username === username)
      throw new BadRequestException('Username already in use');
  }
}
