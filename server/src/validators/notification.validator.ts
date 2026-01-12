import Joi from "joi";
// src/validators/notification.validator.ts

/* =========================
   CREATE NOTIFICATION
========================= */
export const createNotificationSchema = Joi.object({
	user_id: Joi.string()
		.guid({ version: ["uuidv4", "uuidv5"] })
		.required(),
	title: Joi.string().max(255).required(),
	content: Joi.string().allow("").optional(),
	type: Joi.string().max(50).optional(),
});

/* =========================
   PARAM :notificationId
========================= */
export const notificationIdParamSchema = Joi.object({
	id: Joi.number().integer().required(),
});

/* =========================
   PARAM :user_id
========================= */
export const notificationUserParamSchema = Joi.object({
	user_id: Joi.string()
		.guid({ version: ["uuidv4", "uuidv5"] })
		.required(),
});

/* =========================
   QUERY NOTIFICATIONS
========================= */
export const queryNotificationsSchema = Joi.object({
	page: Joi.number().integer().min(1).optional(),
	limit: Joi.number().integer().min(1).max(100).optional(),
	is_read: Joi.boolean().optional(),
	type: Joi.string().optional(),
});


/* =========================
   MARK ALL AS READ (BY USER)
========================= */
export const markAllAsReadParamSchema = Joi.object({
	user_id: Joi.string()
		.guid({ version: ["uuidv4", "uuidv5"] })
		.required(),
});

/* =========================
   GET UNREAD LIST (BY USER)
========================= */
export const getUnreadNotificationsParamSchema = Joi.object({
	user_id: Joi.string()
		.guid({ version: ["uuidv4", "uuidv5"] })
		.required(),
});

/* =========================
   DELETE ALL (BY USER)
========================= */
export const deleteAllNotificationsParamSchema = Joi.object({
	user_id: Joi.string()
		.guid({ version: ["uuidv4", "uuidv5"] })
		.required(),
});

/* =========================
   BULK MARK AS READ
========================= */
export const bulkMarkAsReadSchema = Joi.object({
	ids: Joi.array()
		.items(Joi.number().integer().positive())
		.min(1)
		.required(),
});

