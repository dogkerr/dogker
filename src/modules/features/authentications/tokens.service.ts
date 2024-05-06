import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions, TokenExpiredError } from '@nestjs/jwt';
import { constants } from 'src/commons/constants';
import { JWTPayload } from 'src/commons/tokens/jwt.interface';

@Injectable()
export class TokensService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public signAccessToken(
    userId: string,
    username: string,
    expiresIn = constants.accessTokenExpirationTime,
  ): string {
    const options: JwtSignOptions = {
      privateKey: this.configService.get<string>('JWT_PRIVATE_KEY'),
      algorithm: 'ES256',
      subject: userId,
      expiresIn,
    };

    if (expiresIn) options.expiresIn = expiresIn;
    const accessToken = this.jwtService.sign({ username }, options);
    return accessToken;
  }

  public signRefreshToken(
    userId: string,
    jwtId: string,
    expiresIn = constants.refreshTokenExpirationTime,
  ): string {
    const options: JwtSignOptions = {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      algorithm: 'HS256',
      subject: userId,
      jwtid: jwtId,
      expiresIn,
    };

    return this.jwtService.sign({}, options);
  }

  public async verifyAccessToken(token: string): Promise<boolean> {
    try {
      this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_PUBLIC_KEY'),
        algorithms: ['ES256'],
      });

      return true;
    } catch (err) {
      if (err.name === constants.tokenExpiredError) {
        throw new TokenExpiredError(
          'Token expired. Please refresh the token.',
          new Date(),
        );
      } else {
        throw new UnauthorizedException('Invalid access token');
      }
    }
  }

  public async verifyRefreshToken(token: string): Promise<boolean> {
    try {
      this.jwtService.verify(token, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        algorithms: ['HS256'],
      });

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  public async decodePayload(token: string): Promise<JWTPayload> {
    return this.jwtService.decode(token) as JWTPayload;
  }
}
