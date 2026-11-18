import express from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";
import { corsOptions } from "./config/cors.js";
import { requestlogger } from "./middlewares/requestLoggr.js";
import authRoutes from "./routes/auth.routes.js";
import { apiRateLimiter } from "./middlewares/rateLimiter.js";
import userRoutes from "./routes/user.routes.js";
import { env } from "./config/index.js";
import { logger } from "./lib/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundhandler.js";

const app = express();

app.disable("x-powered-by");

app.use(helmet());
app.use(cors(corsOptions));
app.use(requestlogger);
app.use(apiRateLimiter)
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "webstore-api",
    timestamp: new Date().toISOString(),
  });
});

app.set("trust proxy",
  env.TRUST_PROXY === "looback" ? 1 : 0
);

app.get("/debug/ip")

if (env.NODE_ENV !== "test") {
  app.use(apiRateLimiter);
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
