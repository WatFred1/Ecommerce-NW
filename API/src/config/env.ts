import "dotenv/config";
import rateLimit from "express-rate-limit";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce
    .number()
    .int()
    .min(1)
    .max(65535)
    .default(3000),

  DATABASE_URL: z
    .url()
    .refine(
      (value) => {
        const protocol = new URL(value).protocol;
       return ["postgresql:", "postgres:"].includes(protocol);
      },
      "DATABASE_URL debe utilizar PostgreSQL"
    ),

  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET debe tener al menos 32 caracteres")
    .optional(),

  CORS_ORIGINS: z
    .string()
    .default("http://localhost:5173"),

  RATE_LIMIT_WINDOW_MS: z.coerce.number<number>()
    .int()
    .positive()
    .default(900000),

  RATE_LIMIT_MAX_REQUESTS: z.coerce.number<number>()
    .int()
    .positive()
    .default(100),

  TRUST_PROXY: z.enum(["none", "loopback", "looback"])
    .default("none")
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("Configuración de entorno inválida:");

  for (const issue of result.error.issues) {
    console.error(
      `- ${issue.path.join(".")}: ${issue.message}`
    );
  }

  throw new Error("No se pudo validar la configuración");
}

export const env = Object.freeze({
  ...result.data,
  RATE_LIMIT_MAX_REQUESTS:
    result.data.RATE_LIMIT_MAX_REQUESTS ??
    result.data.RATE_LIMIT_MAX ??
    100,
  TRUST_PROXY:
    result.data.TRUST_PROXY === "looback"
      ? "loopback"
      : result.data.TRUST_PROXY,
});

export type Env = typeof env;