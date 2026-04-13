export interface JwtUserPayload {
  userId: number;
  role: string;
  iat?: number;
  exp?: number;
}
