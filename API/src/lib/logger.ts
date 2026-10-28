import pino from "pino";
import { env } from "../config/index.js";

export const logger = pino({
    level: env.NODE_ENV === "production" ? "info" : "debug",

    base: {
        service: "webstore-api",
        environment: env.NODE_ENV,
    },

    redact: {
        paths: [
            "req.headers.authorization",
            "req.headers.cookie",
            "req.body.password",
            "req.body.token",
            "req.body.refreshToken",
            "password",
            "token",
            "refreshToken",
        ],
        censor: "[REDACTED]",
    },
});