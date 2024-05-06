export interface TokenPayload {
  tokenId: string;
  userId: string;
  username: string;
}

export interface JWTPayload {
  jti?: string;
  sub: string;
  iss: number;
  exp: number;
}

export interface AuthenticationTokens {
  accessToken: string;
  refreshToken: string;
}
