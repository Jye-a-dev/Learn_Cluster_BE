import Joi from "joi";

// ===== CREATE ASSIGNMENT =====
export const createAssignmentSchema = Joi.object({
	course_id: Joi.string().uuid().required(),
	title: Joi.string().optional().allow(null, ""),
	description: Joi.string().optional().allow(null, ""),
	file_url: Joi.string().optional().allow(null, ""),
	deadline: Joi.date().optional().allow(null),
});

// ===== UPDATE / PATCH ASSIGNMENT =====
export const updateAssignmentSchema = Joi.object({
	course_id: Joi.string().uuid().optional(),
	title: Joi.string().optional().allow(null, ""),
	description: Joi.string().optional().allow(null, ""),
	file_url: Joi.string().optional().allow(null, ""),
	deadline: Joi.date().optional().allow(null),
}).min(1);

// ===== PARAM: ASSIGNMENT ID =====
export const assignmentIdParamSchema = Joi.object({
	id: Joi.string().uuid().required(),
});

// ===== PARAM: COURSE ID =====
export const courseIdParamSchema = Joi.object({
	courseId: Joi.string().uuid().required(),
});

// ===== QUERY ASSIGNMENTS =====
export const queryAssignmentsSchema = Joi.object({
	course_id: Joi.string().uuid().optional(),
	page: Joi.number().integer().min(1).optional(),
	limit: Joi.number().integer().min(1).max(100).optional(),
	deadline_before: Joi.date().optional(),
});
