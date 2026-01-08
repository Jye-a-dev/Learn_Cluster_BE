import { Router } from "express";
import { CourseController } from "../controllers/course.controller.js";
import { createCourseSchema, updateCourseSchema, idParamSchema, queryCoursesSchema } from "../validators/course.validator.js";
import { validateBody, validateParams, validateQuery } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", validateQuery(queryCoursesSchema), CourseController.getAll);
router.get("/count", CourseController.count);
router.get("/:id", validateParams(idParamSchema), CourseController.getById);
router.post("/", validateBody(createCourseSchema), CourseController.create);
router.put("/:id", validateParams(idParamSchema), validateBody(updateCourseSchema), CourseController.update);
router.delete("/:id", validateParams(idParamSchema), CourseController.delete);

export default router;
