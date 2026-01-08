// src/middlewares/validate.middleware.ts
import type { Request, Response, NextFunction } from "express";
import type { Schema } from "joi";

// Middleware validate body
export const validateBody = (schema: Schema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
		if (error) {
			return res.status(400).json({ message: "Validation thất bại", details: error.details });
		}
		// Lưu kết quả validate vào property mới
		(req as any).validatedBody = value;
		next();
	};
};

// Middleware validate params
export const validateParams = (schema: Schema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error, value } = schema.validate(req.params, { abortEarly: false, stripUnknown: true });
		if (error) {
			return res.status(400).json({ message: "Validation thất bại", details: error.details });
		}
		(req as any).validatedParams = value;
		next();
	};
};

// Middleware validate query
export const validateQuery = (schema: Schema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const { error, value } = schema.validate(req.query, { abortEarly: false, stripUnknown: true });
			if (error) {
				console.error("Query validation error:", error.details);
				return res.status(400).json({ message: "Validation thất bại", details: error.details });
			}
			console.log("validatedQuery:", value);
			(req as any).validatedQuery = value;
			next();
		} catch (err) {
			console.error("validateQuery error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	};
};
