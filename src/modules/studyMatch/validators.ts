import Joi from "joi";

export const createStudyMatchSchema = Joi.object({
	user1_id: Joi.string().uuid().required(),
	user2_id: Joi.string().uuid().required(),
});

export const studyMatchIdParamSchema = Joi.object({
	id: Joi.string().uuid().required(),
});

export const queryStudyMatchSchema = Joi.object({
	user_id: Joi.string().uuid().optional(),
	page: Joi.number().integer().min(1).optional(),
	limit: Joi.number().integer().min(1).max(100).optional(),
});