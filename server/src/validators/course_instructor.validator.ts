import Joi from "joi";

// ===== CREATE COURSE_INSTRUCTORS =====
export const createCourseInstructorSchema = Joi.object({
	id: Joi.string()
		.guid({ version: ["uuidv1", "uuidv4", "uuidv5"] })
		.required(),

	course_id: Joi.string()
		.guid({ version: ["uuidv1", "uuidv4", "uuidv5"] })
		.required(),

	user_id: Joi.string()
		.guid({ version: ["uuidv1", "uuidv4", "uuidv5"] })
		.required(),

	role_in_course: Joi.string().valid("Teacher", "TA", "Moderator").required(),
});

// ===== UPDATE COURSE_INSTRUCTORS =====
export const updateCourseInstructorSchema = Joi.object({
	role_in_course: Joi.string().valid("Teacher", "TA", "Moderator").optional(),
}).min(1);

// ===== ID PARAM (UUID) =====
export const idParamSchema = Joi.object({
	id: Joi.string()
		.guid({ version: ["uuidv1", "uuidv4", "uuidv5"] })
		.required(),
});

// ===== QUERY / FILTER =====
export const queryCourseInstructorsSchema = Joi.object({
	course_id: Joi.string()
		.guid({ version: ["uuidv1", "uuidv4", "uuidv5"] })
		.optional(),

	user_id: Joi.string()
		.guid({ version: ["uuidv1", "uuidv4", "uuidv5"] })
		.optional(),

	role_in_course: Joi.string().valid("Teacher", "TA", "Moderator").optional(),
});
