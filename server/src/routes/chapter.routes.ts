import { Router } from "express";
import { ChapterController } from "../controllers/chapter.controller.js";
import { createChapterSchema, updateChapterSchema, idParamSchema } from "../validators/chapter.validator.js";
import { validateBody, validateParams } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", ChapterController.getAll);
router.get("/count", ChapterController.count);
router.get("/:id", validateParams(idParamSchema), ChapterController.getById);

router.post("/", validateBody(createChapterSchema), ChapterController.create);
router.put("/:id", validateParams(idParamSchema), validateBody(updateChapterSchema), ChapterController.update);
router.delete("/:id", validateParams(idParamSchema), ChapterController.delete);

export default router;
