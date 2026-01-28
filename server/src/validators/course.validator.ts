import Joi from "joi";

// ===== CREATE COURSE =====
export const createCourseSchema = Joi.object({
	title: Joi.string().min(3).max(255).required(),
	description: Joi.string().optional().allow(null, ""),
	objective: Joi.string().optional().allow(null, ""),
	duration_hours: Joi.number().integer().min(0).optional().allow(null),
	status: Joi.string().valid("draft", "public", "closed").optional(),
});

// ===== UPDATE COURSE =====
export const updateCourseSchema = Joi.object({
	title: Joi.string().min(3).max(255).optional(),
	description: Joi.string().optional().allow(null, ""),
	objective: Joi.string().optional().allow(null, ""),
	duration_hours: Joi.number().integer().min(0).optional().allow(null),
	status: Joi.string().valid("draft", "public", "closed").optional(),
}).min(1);

// ===== ID PARAM (UUID) =====
export const idParamSchema = Joi.object({
	id: Joi.string().guid({ version: ["uuidv1","uuidv4", "uuidv5"] }).required(),
});

// ===== QUERY / FILTER =====
export const queryCoursesSchema = Joi.object({
	page: Joi.number().integer().min(1).optional(),
	limit: Joi.number().integer().min(1).max(100).optional(),
	search: Joi.string().optional().allow(""),
	status: Joi.string().valid("draft", "public", "closed").optional(),
});
