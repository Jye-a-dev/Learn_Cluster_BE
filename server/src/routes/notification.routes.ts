import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller.js";
import { createNotificationSchema, notificationIdParamSchema, notificationUserParamSchema } from "../validators/notification.validator.js";
import { validateBody, validateParams } from "../middlewares/validate.middleware.js";

const router = Router();

// ===== GET ALL (ADMIN / MODERATOR) =====
router.get("/", NotificationController.getAll);

// ===== GET BY USER =====
router.get("/user/:user_id", validateParams(notificationUserParamSchema), NotificationController.getByUser);

// ===== COUNT UNREAD =====
router.get("/user/:user_id/unread/count", validateParams(notificationUserParamSchema), NotificationController.countUnread);

// ===== CREATE =====
router.post("/", validateBody(createNotificationSchema), NotificationController.create);

// ===== MARK AS READ =====
router.patch("/:id/read", validateParams(notificationIdParamSchema), NotificationController.markAsRead);

// ===== DELETE =====
router.delete("/:id", validateParams(notificationIdParamSchema), NotificationController.delete);

export default router;
