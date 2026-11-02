import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import pinoHttp from "pino-http";

import { env } from "./config/index.js";
import { logger } from "./lib/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundhandler.js";

const app = express();

app.disable("x-powered-by");

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(
  pinoHttp({
    logger,
    autoLogging: env.NODE_ENV !== "test",
  })
);

if (env.NODE_ENV !== "test") {
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 300,
      standardHeaders: "draft-8",
      legacyHeaders: false,
      message: { error: "Demasiadas solicitudes, intenta más tarde" },
    })
  );
}

app.get("/", (_req, res) => {
  res.status(200).json({
    mensaje: "API TiendaWeb funcionando correctamente",
    service: "webstore-api",
    endpoints: ["/health"],
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "webstore-api",
    timestamp: new Date().toISOString(),
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
