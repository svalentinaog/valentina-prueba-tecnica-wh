import express, { Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { promises as fsp } from "fs";
import crypto from "crypto";

const router = express.Router();

const UPLOAD_DIR = path.resolve(process.cwd(), "uploads");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (
    _req: Request,
    _file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => cb(null, UPLOAD_DIR),
  filename: (
    _req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    const unique = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    cb(null, `${base}_${unique}${ext}`);
  },
});

const fileFilter: multer.Options["fileFilter"] = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowed = ["image/png", "image/jpeg", "image/jpg"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Invalid image format"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

type UploadRequest = Request & { file: Express.Multer.File };

router.post(
  "/uploads",
  upload.single("file"),
  (req: Request, res: Response) => {
    const run = async () => {
      const file = (req as UploadRequest).file;
      if (!file) {
        return res.status(400).json({ msg: "No file received" });
      }
      const tmpPath = path.join(UPLOAD_DIR, file.filename);
      const buffer = await fsp.readFile(tmpPath);
      const hash = crypto.createHash("sha256").update(buffer).digest("hex");
      const ext = path.extname(file.originalname).toLowerCase();
      const finalName = `${hash}${ext}`;
      const finalPath = path.join(UPLOAD_DIR, finalName);

      const exists = fs.existsSync(finalPath);
      if (!exists) {
        await fsp.rename(tmpPath, finalPath);
      } else {
        await fsp.unlink(tmpPath).catch(() => {});
      }

      const url = `${req.protocol}://${req.get("host")}/uploads/${finalName}`;
      return res.status(201).json({ url });
    };
    void run();
  }
);

export default router;
