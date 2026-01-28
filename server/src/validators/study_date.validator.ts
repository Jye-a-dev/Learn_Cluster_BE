import Joi from "joi";

// ===== COMMON =====
const uuid = Joi.string().guid({
	version: ["uuidv1", "uuidv4", "uuidv5"],
});

// ===== CREATE =====
export const createStudyDateSchema = Joi.object({
	course_id: uuid.required(),

	title: Joi.string().max(255).optional().allow(null, ""),

	// nếu lesson_ids là bảng trung gian với lesson.id = UUID
	lesson_ids: Joi.array().items(uuid).optional().allow(null),

	scheduled_at: Joi.date().optional().allow(null),

	location: Joi.string().optional().allow(null, ""),

	created_by: uuid.optional().allow(null),
});

// ===== UPDATE =====
export const updateStudyDateSchema = Joi.object({
	course_id: uuid.optional(),

	title: Joi.string().max(255).optional().allow(null, ""),

	lesson_ids: Joi.array().items(uuid).optional().allow(null),

	scheduled_at: Joi.date().optional().allow(null),

	location: Joi.string().optional().allow(null, ""),
}).min(1);

// ===== PARAM ID =====
export const idParamSchema = Joi.object({
	id: uuid.required(),
});

// ===== QUERY =====
export const queryStudyDatesSchema = Joi.object({
	course_id: uuid.optional(),

	created_by: uuid.optional(),

	page: Joi.number().integer().min(1).optional(),

	limit: Joi.number().integer().min(1).max(100).optional(),
});

// ===== COURSE PARAM =====
export const courseIdParamSchema = Joi.object({
	course_id: uuid.required(),
});

// ===== UPDATE LESSONS =====
export const updateLessonsSchema = Joi.object({
	lesson_ids: Joi.array().items(uuid).required(),
});
