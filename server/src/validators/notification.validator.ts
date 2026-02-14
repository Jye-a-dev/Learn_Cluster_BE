// src/validators/notification.validator.ts

import Joi from "joi";

/* =========================
   COMMON UUID RULE
========================= */
const uuidSchema = Joi.string()
	.guid({ version: ["uuidv1", "uuidv4", "uuidv5"] })
	.required();

/* =========================
   CREATE NOTIFICATION
========================= */
export const createNotificationSchema = Joi.object({
	user_id: uuidSchema,

	type: Joi.string().trim().max(50).optional(),

	content: Joi.string().allow("").optional(),
}).options({ abortEarly: false });

/* =========================
   PARAM :notificationId
========================= */
export const notificationIdParamSchema = Joi.object({
	id: Joi.string()
		.guid({ version: ["uuidv1", "uuidv4", "uuidv5"] })
		.required(),
});

/* =========================
   PARAM :user_id
========================= */
export const notificationUserParamSchema = Joi.object({
	user_id: uuidSchema,
});

/* =========================
   QUERY NOTIFICATIONS
========================= */
export const queryNotificationsSchema = Joi.object({
	page: Joi.number().integer().min(1).optional(),
	limit: Joi.number().integer().min(1).max(100).optional(),

	is_read: Joi.boolean().truthy("true").falsy("false").optional(),

	type: Joi.string().optional(),
});

/* =========================
   BULK MARK AS READ
========================= */
export const bulkMarkAsReadSchema = Joi.object({
	ids: Joi.array()
		.items(Joi.string().guid({ version: ["uuidv1", "uuidv4", "uuidv5"] }))
		.min(1)
		.required(),
});
