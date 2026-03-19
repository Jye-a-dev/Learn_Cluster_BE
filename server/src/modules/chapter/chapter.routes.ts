import { Router } from "express";
import { ChapterController } from "../chapter/chapter.controller.js";
import { createChapterSchema, updateChapterSchema, idParamSchema, courseIdParamSchema } from "../chapter/chapter.validator.js";
import { validateBody, validateParams } from "../../middlewares/validate.middleware.js";
const router = Router();

router.get("/", ChapterController.getAll);
router.get("/count", ChapterController.count);

router.get("/course/:course_id", validateParams(courseIdParamSchema), ChapterController.getByCourse);

router.get("/id/:id", validateParams(idParamSchema), ChapterController.getById);

router.post("/", validateBody(createChapterSchema), ChapterController.create);

router.put("/id/:id", validateParams(idParamSchema), validateBody(updateChapterSchema), ChapterController.update);

router.patch("/id/:id", validateParams(idParamSchema), validateBody(updateChapterSchema), ChapterController.update);

router.delete("/id/:id", validateParams(idParamSchema), ChapterController.delete);

export default router;
