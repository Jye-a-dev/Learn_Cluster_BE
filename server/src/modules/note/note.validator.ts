// src/validators/note.validator.ts
import Joi from "joi";

/* ===================== COMMON UUID ===================== */

const uuidSchema = Joi.string().guid({
	version: ["uuidv1", "uuidv4", "uuidv5"],
});

/* ===================== CREATE NOTE ===================== */

export const createNoteSchema = Joi.object({
	user_id: uuidSchema.required(),
	lesson_id: uuidSchema.required(),
	content: Joi.string().allow("").optional(),
});

/* ===================== UPDATE NOTE ===================== */

export const updateNoteSchema = Joi.object({
	content: Joi.string().allow("").optional(),
}).min(1);

/* ===================== PARAM ID ===================== */

export const noteIdParamSchema = Joi.object({
	id: uuidSchema.required(),
});

/* ===================== QUERY NOTES ===================== */

export const queryNotesSchema = Joi.object({
	page: Joi.number().integer().min(1).optional(),
	limit: Joi.number().integer().min(1).max(100).optional(),
	user_id: uuidSchema.optional(),
	lesson_id: uuidSchema.optional(),
});

/* ===================== PARAM USER ID ===================== */

export const noteUserIdParamSchema = Joi.object({
	user_id: uuidSchema.required(),
});

/* ===================== PARAM LESSON ID ===================== */

export const noteLessonIdParamSchema = Joi.object({
	lesson_id: uuidSchema.required(),
});
