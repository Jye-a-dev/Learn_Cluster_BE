import Joi from "joi";

/**
 * Reusable UUID schema
 */
const uuidSchema = Joi.string().guid({
	version: ["uuidv1", "uuidv4", "uuidv5"],
});

/* =====================================================
   CREATE MESSAGE
===================================================== */
export const createMessageSchema = Joi.object({
	study_date_id: uuidSchema.required(),

	sender_id: uuidSchema.optional().allow(null),

	content: Joi.string().allow(null, "").optional(),
});

/* =====================================================
   PARAM :id
===================================================== */
export const messageIdParamSchema = Joi.object({
	id: uuidSchema.required(),
});

/* =====================================================
   PARAM :study_date_id
===================================================== */
export const messageStudyDateParamSchema = Joi.object({
	study_date_id: uuidSchema.required(),
});

/* =====================================================
   UPDATE MESSAGE
===================================================== */
export const updateMessageSchema = Joi.object({
	content: Joi.string().allow(null, "").optional(),
}).min(1);
