import type { Request, Response, NextFunction } from "express";
import type { Schema } from "joi";

const validate = (schema: Schema, source: "body" | "params" | "query") => {
	return (req: Request, res: Response, next: NextFunction) => {

		const { error, value } = schema.validate(req[source], {
			abortEarly: false,
			stripUnknown: true,
		});

		if (error) {
			return res.status(400).json({
				message: "Validation thất bại",
				details: error.details,
			});
		}

		if (source === "body") {
			req.body = value;
			(req as any).validatedBody = value;
		}

		if (source === "params") {
			Object.assign(req.params, value);
			(req as any).validatedParams = value;
		}

		if (source === "query") {
			Object.assign(req.query, value);
			(req as any).validatedQuery = value;
		}

		next();
	};
};

export const validateBody = (schema: Schema) => validate(schema, "body");
export const validateParams = (schema: Schema) => validate(schema, "params");
export const validateQuery = (schema: Schema) => validate(schema, "query");
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

		Object.assign(req.params, paramsResult.value);
		Object.assign(req.query, queryResult.value);

		(req as any).validatedParams = paramsResult.value;
		(req as any).validatedQuery = queryResult.value;

		next();
	};