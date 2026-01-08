// src/validators/note.validator.ts
import Joi from "joi";

// ===== CREATE NOTE =====
export const createNoteSchema = Joi.object({
	user_id: Joi.string()
		.guid({ version: ["uuidv4", "uuidv5"] })
		.required(),
	lesson_id: Joi.number().integer().required(),
	content: Joi.string().optional().allow(""),
});

// ===== UPDATE NOTE =====
export const updateNoteSchema = Joi.object({
	content: Joi.string().optional().allow(""),
}).min(1);

// ===== PARAM ID =====
export const noteIdParamSchema = Joi.object({
	id: Joi.number().integer().required(),
});

// ===== QUERY NOTES =====
export const queryNotesSchema = Joi.object({
	page: Joi.number().integer().min(1).optional(),
	limit: Joi.number().integer().min(1).max(100).optional(),
	user_id: Joi.string().guid({ version: ["uuidv4", "uuidv5"] }).optional(),
	lesson_id: Joi.number().integer().optional(),
});
// ===== PARAM USER ID =====
export const noteUserIdParamSchema = Joi.object({
	user_id: Joi.string().guid({ version: ["uuidv4", "uuidv5"] }).required(),
});

// ===== PARAM LESSON ID =====
export const noteLessonIdParamSchema = Joi.object({
	lesson_id: Joi.number().integer().required(),
});
