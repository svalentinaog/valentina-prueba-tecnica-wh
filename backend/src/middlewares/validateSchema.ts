import { NextFunction, Request, Response } from "express";
import { ZodType, ZodIssue } from "zod";

export const validateSchema =
  (schema: ZodType<unknown>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      return res.status(400).json({
        msg: "Invalid request data",
        errors: result.error.issues.map((issue: ZodIssue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    next();
  };
