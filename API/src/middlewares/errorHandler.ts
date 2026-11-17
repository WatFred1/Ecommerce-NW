import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/AppErrors.js";
import { logger } from "../lib/logger.js";
import { env } from "../config/index.js";


export const errorHandler: ErrorRequestHandler=(
    error: unknown,
    req,
    res,
    _next
 ) => {
    if (res.headersSent) {
      _next(error);
      return;
    }

    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        requestId: req.id,
        error: {}
      });
    }
 }

