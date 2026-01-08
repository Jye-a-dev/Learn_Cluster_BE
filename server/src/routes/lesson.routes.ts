import { Router } from "express";
import { LessonController } from "../controllers/lesson.controller.js";
import { createLessonSchema, updateLessonSchema, idParamSchema, chapterIdParamSchema, updateOrderSchema } from "../validators/lesson.validator.js";
import { validateBody, validateParams } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", LessonController.getAll);
router.get("/count", LessonController.count);
router.get("/:id", validateParams(idParamSchema), LessonController.getById);

router.post("/", validateBody(createLessonSchema), LessonController.create);
router.put("/:id", validateParams(idParamSchema), validateBody(updateLessonSchema), LessonController.update);
router.patch("/:id", validateParams(idParamSchema), validateBody(updateLessonSchema), LessonController.update);

router.delete("/:id", validateParams(idParamSchema), LessonController.delete);
router.get("/chapter/:chapter_id", validateParams(chapterIdParamSchema), LessonController.getByChapter);

// Cập nhật ordering của lesson
router.patch("/:id/order", validateParams(idParamSchema), validateBody(updateOrderSchema), LessonController.updateOrder);
export default router;
