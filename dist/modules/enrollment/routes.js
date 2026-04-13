import { Router } from "express";
import { EnrollmentController } from "../enrollment/controller.js";
import { createEnrollmentSchema, updateEnrollmentSchema, idParamSchema, queryEnrollmentsSchema, courseIdParamSchema } from "../enrollment/validators.js";
import { validateBody, validateParams, validateQuery } from "../../middlewares/validate.middleware.js";
const router = Router();
// GET /api/enrollment/ (có filter / phân trang)
router.get("/", validateQuery(queryEnrollmentsSchema), EnrollmentController.getFiltered);
// GET /api/enrollment/count (có filter)
router.get("/count", validateQuery(queryEnrollmentsSchema), EnrollmentController.count);
router.get("/count_students/:course_id", validateParams(courseIdParamSchema), EnrollmentController.countStudentByCourse);
// GET /api/enrollment/:id
router.get("/id/:id", validateParams(idParamSchema), EnrollmentController.getById);
// POST /api/enrollment/
router.post("/", validateBody(createEnrollmentSchema), EnrollmentController.create);
// PUT /api/enrollment/:id
router.put("/id/:id", validateParams(idParamSchema), validateBody(updateEnrollmentSchema), EnrollmentController.update);
// PATCH /api/enrollment/:id (nếu muốn partial update, dùng cùng schema như update)
router.patch("/id/:id", validateParams(idParamSchema), validateBody(updateEnrollmentSchema), EnrollmentController.update);
// DELETE /api/enrollment/:id
router.delete("/id/:id", validateParams(idParamSchema), EnrollmentController.delete);
export default router;
