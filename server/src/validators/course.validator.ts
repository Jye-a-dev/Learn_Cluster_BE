import Joi from "joi";
import type { CourseStatus } from "../@types/course.js";

// ===== CREATE COURSE =====
export const createCourseSchema = Joi.object({
	title: Joi.string().min(3).max(100).required(),
	description: Joi.string().optional().allow(null, ""),
	objective: Joi.string().optional().allow(null, ""),
	duration_hours: Joi.number().integer().min(0).optional().allow(null),
	status: Joi.string().valid("draft", "public", "closed").optional(),
	teacher_id: Joi.string()
		.guid({ version: ["uuidv4", "uuidv5"] })
		.optional()
		.allow(null),
});

// ===== UPDATE COURSE =====
export const updateCourseSchema = Joi.object({
	title: Joi.string().min(3).max(100).optional(),
	description: Joi.string().optional().allow(null, ""),
	objective: Joi.string().optional().allow(null, ""),
	duration_hours: Joi.number().integer().min(0).optional().allow(null),
	status: Joi.string().valid("draft", "public", "closed").optional(),
	teacher_id: Joi.string()
		.guid({ version: ["uuidv4", "uuidv5"] })
		.optional()
		.allow(null),
}).min(1);

// ===== ID PARAM =====
export const idParamSchema = Joi.object({
	id: Joi.number().integer().required(),
});

// ===== QUERY / FILTER =====
export const queryCoursesSchema = Joi.object({
	page: Joi.number().integer().min(1).optional(),
	limit: Joi.number().integer().min(1).max(100).optional(),
	search: Joi.string().optional().allow(""),
	status: Joi.string().valid("draft", "public", "closed").optional(),
	teacher_id: Joi.string()
		.guid({ version: ["uuidv4", "uuidv5"] })
		.optional(),
});
