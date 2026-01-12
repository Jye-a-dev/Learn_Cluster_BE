// src/middlewares/validate.middleware.ts
import type { Request, Response, NextFunction } from "express";
import type { Schema } from "joi";

/* =========================
   GENERIC VALIDATE HELPER
========================= */
const validate = (schema: Schema, source: "body" | "params" | "query") => {
	return (req: Request, res: Response, next: NextFunction) => {
		const data = req[source];
		const { error, value } = schema.validate(data, {
			abortEarly: false,
			stripUnknown: true,
		});

		if (error) {
			return res.status(400).json({
				message: "Validation thất bại",
				details: error.details,
			});
		}

		(req as any)[`validated${source.charAt(0).toUpperCase() + source.slice(1)}`] = value;
		next();
	};
};

/* =========================
   EXPORT SHORTCUTS
========================= */
export const validateBody = (schema: Schema) => validate(schema, "body");
export const validateParams = (schema: Schema) => validate(schema, "params");
export const validateQuery = (schema: Schema) => validate(schema, "query");

/* =========================
   VALIDATE MULTIPLE (PARAMS + QUERY)
========================= */
export const validateParamsAndQuery =
	(paramsSchema: Schema, querySchema: Schema) =>
	(req: Request, res: Response, next: NextFunction) => {
		const paramsResult = paramsSchema.validate(req.params, {
			abortEarly: false,
			stripUnknown: true,
		});
		if (paramsResult.error) {
			return res.status(400).json({
				message: "Validation params thất bại",
				details: paramsResult.error.details,
			});
		}

		const queryResult = querySchema.validate(req.query, {
			abortEarly: false,
			stripUnknown: true,
		});
		if (queryResult.error) {
			return res.status(400).json({
				message: "Validation query thất bại",
				details: queryResult.error.details,
			});
		}

		(req as any).validatedParams = paramsResult.value;
		(req as any).validatedQuery = queryResult.value;
		next();
	};
