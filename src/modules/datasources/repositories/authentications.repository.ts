import { Injectable } from '@nestjs/common';
import { Authentication } from '../entities/authentications.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AuthenticationsRepository extends Repository<Authentication> {
  constructor(private readonly dataSource: DataSource) {
    super(Authentication, dataSource.createEntityManager());
  }

  public async findOneByIdAndUserId(
    id: string,
    userId: string,
  ): Promise<Authentication | null> {
    return this.createQueryBuilder('a')
      .select(['a.id', 'u.id', 'u.username'])
      .leftJoin('a.user', 'u')
      .where('a.id = :id', { id })
      .andWhere('u.id = :userId', { userId })
      .getOne();
  }
}
