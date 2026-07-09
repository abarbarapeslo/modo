import { Router } from "express";

export const configRouter = Router();

/** Token Mapbox — apenas no servidor; o frontend busca em runtime. */
configRouter.get("/mapbox-token", (_req, res) => {
  const token = process.env.MAPBOX_ACCESS_TOKEN?.trim();
  if (!token) {
    res.status(503).json({ error: "Mapbox not configured", token: null });
    return;
  }
  res.json({ token });
});
