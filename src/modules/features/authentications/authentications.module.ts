import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatasourcesModule } from 'src/modules/datasources/datasources.module';
import { AuthenticationsController } from './authentications.controller';
import { AuthenticationsService } from './authentications.service';
import { TokensService } from './tokens.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot(), DatasourcesModule],
  controllers: [AuthenticationsController],
  providers: [JwtService, AuthenticationsService, TokensService],
})
export class AuthenticationsModule {}
