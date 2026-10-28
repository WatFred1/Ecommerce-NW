

import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.get("/health", (_req, res) => {
res.status(200).json({
status: "ok",
service: "webstore-api",
timestamp: new Date().toISOString(),
});
});
export default app;