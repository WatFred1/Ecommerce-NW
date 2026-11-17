import type { CorsOptions } from 'cors';
import { env } from '../config/index.js';

const allowedOrigins = new Set(
    env.CORS_ORIGINS
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean)
);

export const corsOptions: CorsOptions = {
    origin(origin, callback) {
        if (!origin || allowedOrigins.has(origin)) {
            callback(null, true);
            return;
        }
        callback(null, false);
    },

    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
    ],

    exposedHeaders: [
        "X-Request-Id",
        "RateLimit",
        "RateLimit-Policy",
        "Retry-After",
    ],
    credentials: false,
    optionsSuccessStatus: 204,
};

        
    