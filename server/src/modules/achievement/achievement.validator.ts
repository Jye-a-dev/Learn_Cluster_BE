// src/validators/achievement.validator.ts
import Joi from "joi";

export const createAchievementSchema = Joi.object({
	user_id: Joi.string()
		.guid({ version: ["uuidv1", "uuidv4", "uuidv5"] })
		.required(),
	name: Joi.string().max(100).required(),
	description: Joi.string().optional().allow(""),
});

export const bulkCreateAchievementSchema = Joi.array()
	.items(
		Joi.object({
			user_id: Joi.string()
				.guid({ version: ["uuidv1", "uuidv4", "uuidv5"] })
				.required(),
			name: Joi.string().max(100).required(),
			description: Joi.string().optional().allow(""),
		})
	)
	.min(1)
	.required();

export const updateAchievementSchema = Joi.object({
	name: Joi.string().max(100).optional(),
	description: Joi.string().optional().allow(""),
}).min(1);

export const achievementIdParamSchema = Joi.object({
	id: Joi.string()
		.guid({ version: ["uuidv1", "uuidv4", "uuidv5"] })
		.required(),
});

export const userIdParamSchema = Joi.object({
	userId: Joi.string()
		.guid({ version: ["uuidv1", "uuidv4", "uuidv5"] })
		.required(),
});

export const queryAchievementsSchema = Joi.object({
	page: Joi.number().integer().min(1).optional(),
	limit: Joi.number().integer().min(1).max(100).optional(),
	user_id: Joi.string()
		.guid({ version: ["uuidv1", "uuidv4", "uuidv5"] })
		.optional(),
});
