import Joi from "joi";

/* ===================== CREATE BOOKMARK ===================== */

export const createBookmarkSchema = Joi.object({
	user_id: Joi.string().uuid().required(),
	lesson_id: Joi.string().uuid().required(),
});


/* ===================== PARAM ID (PRIMARY KEY) ===================== */

export const bookmarkIdParamSchema = Joi.object({
	id: Joi.string().uuid().required(),
});


/* ===================== QUERY BOOKMARKS ===================== */

export const queryBookmarksSchema = Joi.object({
	page: Joi.number().integer().min(1).optional(),
	limit: Joi.number().integer().min(1).max(100).optional(),
	user_id: Joi.string().uuid().optional(),
	lesson_id: Joi.string().uuid().optional(),
});


/* ===================== UPDATE BOOKMARK ===================== */

export const updateBookmarkSchema = Joi.object({
	lesson_id: Joi.string().uuid().required(),
});


/* ===================== DELETE BY USER + LESSON ===================== */

export const deleteBookmarkByUserLessonSchema = Joi.object({
	user_id: Joi.string().uuid().required(),
	lesson_id: Joi.string().uuid().required(),
});


/* ===================== PARAM USER ID ===================== */

export const userIdParamSchema = Joi.object({
	userId: Joi.string().uuid().required(),
});


/* ===================== PARAM LESSON ID ===================== */

export const lessonIdParamSchema = Joi.object({
	lessonId: Joi.string().uuid().required(),
});
