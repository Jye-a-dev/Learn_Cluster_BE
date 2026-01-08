import Joi from "joi";

// ===== CREATE NOTIFICATION =====
export const createNotificationSchema = Joi.object({
	user_id: Joi.string()
		.guid({ version: ["uuidv4", "uuidv5"] })
		.required(),

	type: Joi.string().max(50).optional().allow(null),

	content: Joi.string().optional().allow(null),
});

// ===== PARAM :id =====
export const notificationIdParamSchema = Joi.object({
	id: Joi.number().integer().positive().required(),
});

// ===== PARAM :user_id =====
export const notificationUserParamSchema = Joi.object({
	user_id: Joi.string()
		.guid({ version: ["uuidv4", "uuidv5"] })
		.required(),
});

// ===== MARK AS READ =====
export const markAsReadSchema = Joi.object({
	is_read: Joi.boolean().valid(true).required(),
});

// ===== QUERY (OPTIONAL – ADMIN LIST) =====
export const queryNotificationsSchema = Joi.object({
	user_id: Joi.string()
		.guid({ version: ["uuidv4", "uuidv5"] })
		.optional(),
	is_read: Joi.boolean().optional(),
});
