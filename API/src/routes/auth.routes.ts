import { Router } from "express";

const router = Router();

router.post("/login", (_req, res) => {
  res.status(501).json({
    success: false,
    error: "Inicio de sesion no implementado",
  });
});

export default router;
