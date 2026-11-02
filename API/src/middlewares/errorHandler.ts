import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

import { logger } from "../lib/logger.js";

/**
 * Error con código HTTP explícito, pensado para lanzarse desde
 * controladores y servicios y ser formateado por `errorHandler`.
 */
export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      error: "Datos de entrada inválidos",
      details: error.issues.map((issue) => ({
        campo: issue.path.join("."),
        mensaje: issue.message,
      })),
    });
    return;
  }

  if (error instanceof HttpError) {
    res.status(error.status).json({
      error: error.message,
      ...(error.details === undefined ? {} : { details: error.details }),
    });
    return;
  }

  logger.error(
    { err: error, method: req.method, url: req.originalUrl },
    "Error no controlado"
  );

  res.status(500).json({
    error: "Error interno del servidor",
  });
};
