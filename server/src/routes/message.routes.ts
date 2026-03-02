import { Router } from "express";
import { MessageController } from "../modules/message/message.controller.js";
import { createMessageSchema, updateMessageSchema, messageIdParamSchema, messageStudyDateParamSchema } from "../modules/message/message.validator.js";
import { validateBody, validateParams } from "../middlewares/validate.middleware.js";

const router = Router();

// ===== GET ALL (ADMIN / MODERATOR) =====
router.get("/", MessageController.getAll);

// ===== GET COUNT =====
router.get("/count", MessageController.count);

// ===== GET BY ID =====
router.get("/:id", validateParams(messageIdParamSchema), MessageController.getById);

// ===== GET BY STUDY DATE =====
router.get("/study-date/:study_date_id", validateParams(messageStudyDateParamSchema), MessageController.getByStudyDate);

// ===== CREATE =====
router.post("/", validateBody(createMessageSchema), MessageController.create);

// ===== UPDATE =====
router.put("/:id", validateParams(messageIdParamSchema), validateBody(updateMessageSchema), MessageController.update);

router.patch("/:id", validateParams(messageIdParamSchema), validateBody(updateMessageSchema), MessageController.update);
// ===== DELETE =====
router.delete("/:id", validateParams(messageIdParamSchema), MessageController.delete);

export default router;
