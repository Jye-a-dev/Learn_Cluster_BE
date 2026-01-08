import { Router } from "express";
import { GradeController } from "../controllers/grade.controller.js";
import { createGradeSchema, updateGradeSchema, idParamSchema } from "../validators/grade.validator.js";
import { validateBody, validateParams } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", GradeController.getAll);
router.get("/count", GradeController.count);
router.get("/:id", validateParams(idParamSchema), GradeController.getById);

router.post("/", validateBody(createGradeSchema), GradeController.create);
router.put("/:id", validateParams(idParamSchema), validateBody(updateGradeSchema), GradeController.update);
router.delete("/:id", validateParams(idParamSchema), GradeController.delete);

export default router;
