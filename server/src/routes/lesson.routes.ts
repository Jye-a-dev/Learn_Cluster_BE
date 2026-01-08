import { Router } from "express";
import { LessonController } from "../controllers/lesson.controller.js";
import { createLessonSchema, updateLessonSchema, idParamSchema } from "../validators/lesson.validator.js";
import { validateBody, validateParams } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", LessonController.getAll);
router.get("/count", LessonController.count);
router.get("/:id", validateParams(idParamSchema), LessonController.getById);

router.post("/", validateBody(createLessonSchema), LessonController.create);
router.put("/:id", validateParams(idParamSchema), validateBody(updateLessonSchema), LessonController.update);
router.delete("/:id", validateParams(idParamSchema), LessonController.delete);

export default router;
