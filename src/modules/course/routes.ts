import { Router } from "express";
import { CourseController } from "../course/controller.js";
import { createCourseSchema, updateCourseSchema, idParamSchema, queryCoursesSchema } from "../course/validators.js";
import { validateBody, validateParams, validateQuery } from "../../middlewares/validate.middleware.js";

const router = Router();

router.get("/", validateQuery(queryCoursesSchema), CourseController.getAll);
router.get("/count", CourseController.count);
router.get("/id/:id", validateParams(idParamSchema), CourseController.getById);
router.post("/", validateBody(createCourseSchema), CourseController.create);

router.put("/id/:id", validateParams(idParamSchema), validateBody(updateCourseSchema), CourseController.update);
router.patch("/id/:id", validateParams(idParamSchema), validateBody(updateCourseSchema), CourseController.update);

router.delete("/id/:id", validateParams(idParamSchema), CourseController.delete);



export default router;
