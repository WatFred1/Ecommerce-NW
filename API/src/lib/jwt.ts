import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "../config/index.js";

export interface AccessTokenPayload extends JwtPayload {
  sub: string;
  id_usuario?: number;
}

function getJwtSecret(): string {
  if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET no esta configurado");
  }
  return env.JWT_SECRET;
}

export function signAccessToken(
  payload: Omit<AccessTokenPayload, "iat" | "exp">,
  expiresIn: jwt.SignOptions["expiresIn"] = "1h"
): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn });
}

export function verifyaccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, getJwtSecret()) as AccessTokenPayload;
}