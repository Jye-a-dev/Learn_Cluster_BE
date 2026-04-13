import { Router } from "express";
import { CourseInstructorController } from "../courseInstructor/controller.js";
import {
	createCourseInstructorSchema,
	updateCourseInstructorSchema,
	idParamSchema,
	queryCourseInstructorsSchema,
	userIdParamSchema,
	courseIdParamSchema,
} from "../courseInstructor/validators.js";
import { validateBody, validateParams, validateQuery } from "../../middlewares/validate.middleware.js";

const router = Router();

// ===== GET LIST =====
router.get("/", validateQuery(queryCourseInstructorsSchema), CourseInstructorController.getAll);

// ===== GET BY ID =====
router.get("/id/:id", validateParams(idParamSchema), CourseInstructorController.getById);

//=============Count========
router.get("/count/:course_id", CourseInstructorController.countByCourse);
// ===== CREATE =====
router.post("/", validateBody(createCourseInstructorSchema), CourseInstructorController.create);

// ===== UPDATE ROLE =====
router.put("/id/:id", validateParams(idParamSchema), validateBody(updateCourseInstructorSchema), CourseInstructorController.updateRole);
router.patch("/id/:id", validateParams(idParamSchema), validateBody(updateCourseInstructorSchema), CourseInstructorController.updateRole);

// ===== DELETE =====
router.delete("/id/:id", validateParams(idParamSchema), CourseInstructorController.delete);

// ===== BY COURSE =====
router.get("/course/:course_id", validateParams(courseIdParamSchema), CourseInstructorController.getByCourse);
// ===== BY USER =====
router.get("/user/:user_id", validateParams(userIdParamSchema), CourseInstructorController.getByUser);
// ===== FULL INFO =====
router.get("/course/:course_id/full", CourseInstructorController.getFullByCourse);

// ===== DELETE ALL BY COURSE =====
router.delete("/course/:course_id", CourseInstructorController.deleteByCourse);

export default router;
