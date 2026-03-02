import Joi from "joi";

export const createStudySwipeSchema = Joi.object({
	swiper_id: Joi.string().uuid().required(),
	target_id: Joi.string().uuid().required(),
	status: Joi.string()
		.valid("pending", "accepted", "rejected")
		.optional(),
});

export const updateStudySwipeSchema = Joi.object({
	status: Joi.string()
		.valid("pending", "accepted", "rejected")
		.optional(),
}).min(1);

export const studySwipeIdParamSchema = Joi.object({
	id: Joi.string().uuid().required(),
});

export const queryStudySwipeSchema = Joi.object({
	swiper_id: Joi.string().uuid().optional(),
	target_id: Joi.string().uuid().optional(),
	status: Joi.string()
		.valid("pending", "accepted", "rejected")
		.optional(),
	page: Joi.number().integer().min(1).optional(),
	limit: Joi.number().integer().min(1).max(100).optional(),
});