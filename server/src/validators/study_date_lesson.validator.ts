import Joi from "joi";

// ===== CREATE =====
export const createStudyDateLessonSchema = Joi.object({
	study_date_id: Joi.string()
		.guid({ version: ["uuidv1", "uuidv4", "uuidv5"] })
		.required(),
	lesson_id: Joi.string()
		.guid({ version: ["uuidv1", "uuidv4", "uuidv5"] })
		.required(),
});

// ===== UPDATE =====
// bảng trung gian → thực tế không update, nhưng vẫn giữ cho đủ CRUD
export const updateStudyDateLessonSchema = Joi.object({
	study_date_id: Joi.string()
		.guid({ version: ["uuidv1", "uuidv4", "uuidv5"] })
		.optional(),
	lesson_id: Joi.string()
		.guid({ version: ["uuidv1", "uuidv4", "uuidv5"] })
		.optional(),
}).min(1);

// ===== ID PARAM =====
export const idParamSchema = Joi.object({
	id: Joi.string()
		.guid({ version: ["uuidv1", "uuidv4", "uuidv5"] })
		.required(),
});

// ===== QUERY =====
export const queryStudyDateLessonSchema = Joi.object({
	study_date_id: Joi.string()
		.guid({ version: ["uuidv1", "uuidv4", "uuidv5"] })
		.optional(),
	lesson_id: Joi.string()
		.guid({ version: ["uuidv1", "uuidv4", "uuidv5"] })
		.optional(),
	page: Joi.number().integer().min(1).optional(),
	limit: Joi.number().integer().min(1).max(100).optional(),
});
