// src/validators/user.validator.ts
import Joi from "joi";

// ===== CREATE USER =====
export const createUserSchema = Joi.object({
	username: Joi.string().min(3).max(50).required(),
	email: Joi.string().email().required(),
	password_hash: Joi.string().min(6).required(),
	role_id: Joi.number().optional().allow(null),
});

// ===== UPDATE USER =====
export const updateUserSchema = Joi.object({
	username: Joi.string().min(3).max(50).optional(),
	email: Joi.string().email().optional(),
	password_hash: Joi.string().min(6).optional(),
	role_id: Joi.number().optional().allow(null),
}).min(1); // phải có ít nhất 1 field

// ===== GET USER BY ID / DELETE USER =====
export const idParamSchema = Joi.object({
	id: Joi.string()
		.guid({ version: ["uuidv4", "uuidv5"] })
		.required(),
});

// ===== QUERY USERS (OPTIONAL) =====
export const queryUsersSchema = Joi.object({
	page: Joi.number().integer().min(1).optional(),
	limit: Joi.number().integer().min(1).max(100).optional(),
	search: Joi.string().optional().allow(""),
	role_id: Joi.number().optional().allow(null),
});

// ===== VALIDATION FUNCTION (OPTIONAL) =====
export function validateSchema<T>(schema: Joi.Schema<T>, data: any) {
	const { error, value } = schema.validate(data, { abortEarly: false, stripUnknown: true });
	if (error) {
		throw new Error(error.details.map((d) => d.message).join(", "));
	}
	return value;
}
