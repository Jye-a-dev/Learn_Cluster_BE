import { Router } from "express";
import { EnrollmentController } from "../controllers/enrollment.controller.js";
import { createEnrollmentSchema, updateEnrollmentSchema, idParamSchema } from "../validators/enrollment.validator.js";
import { validateBody, validateParams } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", EnrollmentController.getAll);
router.get("/count", EnrollmentController.count);
router.get("/:id", validateParams(idParamSchema), EnrollmentController.getById);

router.post("/", validateBody(createEnrollmentSchema), EnrollmentController.create);
router.put("/:id", validateParams(idParamSchema), validateBody(updateEnrollmentSchema), EnrollmentController.update);
router.delete("/:id", validateParams(idParamSchema), EnrollmentController.delete);

export default router;
