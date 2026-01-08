// src/validators/achievement.validator.ts
import Joi from "joi";

// ===== CREATE ACHIEVEMENT =====
export const createAchievementSchema = Joi.object({
	user_id: Joi.string()
		.guid({ version: ["uuidv4", "uuidv5"] })
		.required(),
	name: Joi.string().max(100).required(),
	description: Joi.string().optional().allow(""),
});

// ===== UPDATE ACHIEVEMENT =====
export const updateAchievementSchema = Joi.object({
	name: Joi.string().max(100).optional(),
	description: Joi.string().optional().allow(""),
}).min(1);

// ===== PARAM ID =====
export const achievementIdParamSchema = Joi.object({
	id: Joi.number().integer().required(),
});

// ===== QUERY ACHIEVEMENTS =====
export const queryAchievementsSchema = Joi.object({
	page: Joi.number().integer().min(1).optional(),
	limit: Joi.number().integer().min(1).max(100).optional(),
	user_id: Joi.string().guid({ version: ["uuidv4", "uuidv5"] }).optional(),
});
