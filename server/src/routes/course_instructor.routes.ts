import { Router } from "express";
import { CourseInstructorController } from "../controllers/course_instructor.controller.js";
import {
	createCourseInstructorSchema,
	updateCourseInstructorSchema,
	idParamSchema,
	queryCourseInstructorsSchema,
} from "../validators/course_instructor.validator.js";
import { validateBody, validateParams, validateQuery } from "../middlewares/validate.middleware.js";

const router = Router();

// ===== GET LIST =====
router.get("/", validateQuery(queryCourseInstructorsSchema), CourseInstructorController.getAll);

// ===== GET BY ID =====
router.get("/:id", validateParams(idParamSchema), CourseInstructorController.getById);

// ===== CREATE =====
router.post("/", validateBody(createCourseInstructorSchema), CourseInstructorController.create);

// ===== UPDATE ROLE =====
router.put("/:id", validateParams(idParamSchema), validateBody(updateCourseInstructorSchema), CourseInstructorController.updateRole);
router.patch("/:id", validateParams(idParamSchema), validateBody(updateCourseInstructorSchema), CourseInstructorController.updateRole);

// ===== DELETE =====
router.delete("/:id", validateParams(idParamSchema), CourseInstructorController.delete);

// ===== BY COURSE =====
router.get("/course/:course_id", CourseInstructorController.getByCourse);

// ===== BY USER =====
router.get("/user/:user_id", CourseInstructorController.getByUser);

// ===== FULL INFO =====
router.get("/course/:course_id/full", CourseInstructorController.getFullByCourse);

// ===== DELETE ALL BY COURSE =====
router.delete("/course/:course_id", CourseInstructorController.deleteByCourse);

export default router;
