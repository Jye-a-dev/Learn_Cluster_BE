import Joi from "joi";

/* ================= LOGIN ================= */

export const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});

/* ================= REGISTER ================= */

export const registerSchema = Joi.object({
	username: Joi.string().min(3).max(50).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});

/* ================= GOOGLE LOGIN ================= */

export const googleLoginSchema = Joi.object({
  credential: Joi.string().required(),
});