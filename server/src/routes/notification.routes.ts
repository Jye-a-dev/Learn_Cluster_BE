import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller.js";
import {
	createNotificationSchema,
	notificationIdParamSchema,
	notificationUserParamSchema,
	bulkMarkAsReadSchema,
	queryNotificationsSchema,
} from "../validators/notification.validator.js";
import { validateBody, validateParams, validateQuery, validateParamsAndQuery } from "../middlewares/validate.middleware.js";

const router = Router();

/* ===== GET ALL (ADMIN / MODERATOR) ===== */
router.get("/", validateQuery(queryNotificationsSchema), NotificationController.getAll);

/* ===== GET BY USER (WITH PAGINATION / FILTER) ===== */
router.get("/user/:user_id", validateParamsAndQuery(notificationUserParamSchema, queryNotificationsSchema), NotificationController.getByUser);

/* ===== GET UNREAD LIST ===== */
router.get("/user/:user_id/unread", validateParams(notificationUserParamSchema), NotificationController.getUnreadByUser);

/* ===== COUNT UNREAD ===== */
router.get("/user/:user_id/unread/count", validateParams(notificationUserParamSchema), NotificationController.countUnread);

/* ===== CREATE ===== */
router.post("/", validateBody(createNotificationSchema), NotificationController.create);

/* ===== MARK AS READ (SINGLE) ===== */
router.patch("/:id/read", validateParams(notificationIdParamSchema), NotificationController.markAsRead);

/* ===== MARK ALL AS READ ===== */
router.patch("/user/:user_id/read-all", validateParams(notificationUserParamSchema), NotificationController.markAllAsRead);

/* ===== BULK MARK AS READ ===== */
router.patch("/read", validateBody(bulkMarkAsReadSchema), NotificationController.bulkMarkAsRead);

/* ===== DELETE ONE ===== */
router.delete("/:id", validateParams(notificationIdParamSchema), NotificationController.delete);

/* ===== DELETE ALL BY USER ===== */
router.delete("/user/:user_id", validateParams(notificationUserParamSchema), NotificationController.deleteAllByUser);

export default router;
