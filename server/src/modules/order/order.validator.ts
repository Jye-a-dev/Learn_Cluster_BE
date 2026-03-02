import Joi from "joi";

const uuidSchema = Joi.string().guid({
	version: ["uuidv1", "uuidv4", "uuidv5"],
});

const statusEnum = ["pending", "paid", "failed", "cancelled"];

/* ===================== CREATE ===================== */

export const createOrderSchema = Joi.object({
	user_id: uuidSchema.required(),
	total_amount: Joi.number().precision(2).min(0).required(),
	status: Joi.string().valid(...statusEnum).optional(),
});

/* ===================== UPDATE ===================== */

export const updateOrderSchema = Joi.object({
	total_amount: Joi.number().precision(2).min(0).optional(),
	status: Joi.string().valid(...statusEnum).optional(),
}).min(1);

/* ===================== PARAM ID ===================== */

export const orderIdParamSchema = Joi.object({
	id: uuidSchema.required(),
});

/* ===================== PARAM USER ID ===================== */

export const orderUserIdParamSchema = Joi.object({
	user_id: uuidSchema.required(),
});