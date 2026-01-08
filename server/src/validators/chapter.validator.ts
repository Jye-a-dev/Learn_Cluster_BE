import Joi from "joi";

// ===== CREATE CHAPTER =====
export const createChapterSchema = Joi.object({
	course_id: Joi.number().integer().required(),
	title: Joi.string().max(255).required(),
	ordering: Joi.number().integer().required(),
});

// ===== UPDATE CHAPTER =====
export const updateChapterSchema = Joi.object({
	course_id: Joi.number().integer().optional(),
	title: Joi.string().max(255).optional(),
	ordering: Joi.number().integer().optional(),
}).min(1);

// ===== GET / DELETE BY ID =====
export const idParamSchema = Joi.object({
	id: Joi.number().integer().required(),
});

// ===== GET CHAPTERS BY COURSE =====
export const courseIdParamSchema = Joi.object({
	courseId: Joi.number().integer().required(),
});

// ===== PAGINATION / QUERY =====
export const queryChaptersSchema = Joi.object({
	page: Joi.number().integer().min(1).optional(),
	limit: Joi.number().integer().min(1).max(100).optional(),
	course_id: Joi.number().integer().optional(),
});
