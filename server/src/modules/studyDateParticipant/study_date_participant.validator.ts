import Joi from "joi";

/**
 * Dùng chung cho các ID có khả năng là:
 * - UUID (hiện tại)
 * - number (legacy / tương lai)
 */
const studyDateIdSchema = Joi.alternatives()
	.try(
		Joi.string().guid({
			version: ["uuidv1", "uuidv4", "uuidv5", "uuidv7"],
		}),
		Joi.number().integer().positive(),
	)
	.required();

const userIdSchema = Joi.string()
	.guid({
		version: ["uuidv1", "uuidv4", "uuidv5", "uuidv7"],
	})
	.required();

/* =========================
   PARAM SCHEMAS
   ========================= */

export const studyDateIdParamSchema = Joi.object({
	study_date_id: studyDateIdSchema,
});

export const userIdParamSchema = Joi.object({
	user_id: userIdSchema,
});

export const studyDateUserParamSchema = Joi.object({
	study_date_id: studyDateIdSchema,
	user_id: userIdSchema,
});

/* =========================
   BODY SCHEMA
   ========================= */

export const joinStudyDateSchema = Joi.object({
	study_date_id: studyDateIdSchema,
	user_id: userIdSchema,
});
