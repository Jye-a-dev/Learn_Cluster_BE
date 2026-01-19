export interface JwtUserPayload {
  userId: number;
  role: string;
  permissions: string[];
  iat?: number;
  exp?: number;
}
