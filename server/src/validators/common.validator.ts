// src/validators/common.validator.ts
import Joi from "joi";

// ===== REUSABLE VALIDATION FUNCTION =====
export function validateSchema<T>(schema: Joi.Schema<T>, data: any) {
	const { error, value } = schema.validate(data, {
		abortEarly: false,
		stripUnknown: true,
	});
	if (error) {
		throw new Error(error.details.map((d) => d.message).join(", "));
	}
	return value;
}
