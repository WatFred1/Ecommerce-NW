import { describe, expect, it } from "vitest";
import request from "supertest";

import app from "../app.js";

describe("API", () => {
  it("GET /health responde 200 con el estado del servicio", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.service).toBe("webstore-api");
    expect(typeof res.body.timestamp).toBe("string");
  });

  it("GET / devuelve la información básica de la API", async () => {
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.body.service).toBe("webstore-api");
  });

  it("una ruta inexistente responde 404 con el JSON del notFoundHandler", async () => {
    const res = await request(app).get("/no-existe");

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Ruta no encontrada");
    expect(res.body.path).toBe("/no-existe");
  });
});
