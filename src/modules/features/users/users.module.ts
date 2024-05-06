import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatasourcesModule } from 'src/modules/datasources/datasources.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), DatasourcesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
