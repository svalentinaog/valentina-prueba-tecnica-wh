import express, { Request, Response } from "express";
import cors from "cors";
import characterRoutes from "./routes/characterRoutes";
import uploadRoute from "./routes/uploadRoutes";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));
app.use("/api/characters", characterRoutes);
app.use("/api", uploadRoute);

app.get("/heartbeat", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

export default app;
