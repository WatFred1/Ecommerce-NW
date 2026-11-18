import {rateLimit} from "express-rate-limit";
import { env } from "../config/index.js";

export const apiRateLimiter = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    limit: env.RATE_LIMIT_MAX_REQUESTS,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 56,

    skip: (req) => req.path === "/health" ,
    handler: (req, res) => {
        req.log.warn(
            {
                requestId: req.id,
                ip: req.ip,
                path: req.path,
            },
            "Rate Limit exceded"
        );
        res.status(429).json({
            success: false,
            requestId: req.id,
            error: {
                code: "RATE_LIMIT_EXCEEDED",
                message: "Demasiadas solicitudes, intenta más tarde",
            },
        });
    },

});