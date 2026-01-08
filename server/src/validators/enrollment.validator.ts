import Joi from "joi";

// ===== CREATE ENROLLMENT =====
export const createEnrollmentSchema = Joi.object({
	user_id: Joi.string().guid({ version: ["uuidv4", "uuidv5"] }).required(),
	course_id: Joi.number().integer().required(),
});

// ===== UPDATE ENROLLMENT =====
export const updateEnrollmentSchema = Joi.object({
	user_id: Joi.string().guid({ version: ["uuidv4", "uuidv5"] }).optional(),
	course_id: Joi.number().integer().optional(),
}).min(1);

// ===== GET / DELETE ENROLLMENT BY ID =====
export const idParamSchema = Joi.object({
	id: Joi.number().integer().required(),
});
