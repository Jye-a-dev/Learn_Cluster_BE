import { Router } from "express";
import { MessageController } from "../controllers/message.controller.js";
import { createMessageSchema, messageIdParamSchema, messageStudyDateParamSchema } from "../validators/message.validator.js";
import { validateBody, validateParams } from "../middlewares/validate.middleware.js";

const router = Router();

// ===== GET ALL (ADMIN / MODERATOR) =====
router.get("/", MessageController.getAll);

// ===== GET BY STUDY DATE =====
router.get("/study-date/:study_date_id", validateParams(messageStudyDateParamSchema), MessageController.getByStudyDate);

// ===== CREATE =====
router.post("/", validateBody(createMessageSchema), MessageController.create);

// ===== DELETE =====
router.delete("/:id", validateParams(messageIdParamSchema), MessageController.delete);

export default router;
