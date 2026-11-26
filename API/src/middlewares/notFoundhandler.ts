import type { RequestHandler } from "express";

import {AppError} from "../errors/index.js";

export const notFoundHandler: RequestHandler = (req,
   res, 
   next
  ) => {
    next(
      new AppError(
        "Ruta no encontrada",
        404,
        "ROUTE_NOT_FOUND",
        { method: req.method, path: req.path }
      )
    );
  };

