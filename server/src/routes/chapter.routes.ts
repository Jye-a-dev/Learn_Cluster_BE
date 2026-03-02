import { Router } from "express";
import { ChapterController } from "../modules/chapter/chapter.controller.js";
import { createChapterSchema, updateChapterSchema, idParamSchema } from "../modules/chapter/chapter.validator.js";
import { validateBody, validateParams } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", ChapterController.getAll);
router.get("/count", ChapterController.count);
router.get("/:id", validateParams(idParamSchema), ChapterController.getById);

router.post("/", validateBody(createChapterSchema), ChapterController.create);
router.put("/:id", validateParams(idParamSchema), validateBody(updateChapterSchema), ChapterController.update);
router.patch("/:id", validateParams(idParamSchema), validateBody(updateChapterSchema), ChapterController.update);
router.delete("/:id", validateParams(idParamSchema), ChapterController.delete);

export default router;
