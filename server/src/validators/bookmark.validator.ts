// src/validators/bookmark.validator.ts
import Joi from "joi";

// ===== CREATE BOOKMARK =====
export const createBookmarkSchema = Joi.object({
	user_id: Joi.string()
		.guid({ version: ["uuidv4", "uuidv5"] })
		.required(),
	lesson_id: Joi.number().integer().required(),
});

// ===== PARAM ID =====
export const bookmarkIdParamSchema = Joi.object({
	id: Joi.number().integer().required(),
});

// ===== QUERY BOOKMARKS =====
export const queryBookmarksSchema = Joi.object({
	page: Joi.number().integer().min(1).optional(),
	limit: Joi.number().integer().min(1).max(100).optional(),
	user_id: Joi.string().guid({ version: ["uuidv4", "uuidv5"] }).optional(),
});

// ===== UPDATE BOOKMARK =====
export const updateBookmarkSchema = Joi.object({
	lesson_id: Joi.number().integer().required(),
});

// ===== DELETE BOOKMARK BY USER + LESSON =====
export const deleteBookmarkByUserLessonSchema = Joi.object({
	user_id: Joi.string()
		.guid({ version: ["uuidv4", "uuidv5"] })
		.required(),
	lesson_id: Joi.number().integer().required(),
});

// ===== PARAM USER ID =====
export const userIdParamSchema = Joi.object({
	userId: Joi.string().guid({ version: ["uuidv4", "uuidv5"] }).required(),
});

// ===== PARAM LESSON ID =====
export const lessonIdParamSchema = Joi.object({
	lessonId: Joi.number().integer().required(),
});
