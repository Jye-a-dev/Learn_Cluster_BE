import { Router } from "express";
import { AssignmentController } from "../controllers/assignment.controller.js";
import { createAssignmentSchema, updateAssignmentSchema, idParamSchema } from "../validators/assignment.validator.js";
import { validateBody, validateParams } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", AssignmentController.getAll);
router.get("/count", AssignmentController.count);
router.get("/:id", validateParams(idParamSchema), AssignmentController.getById);

router.post("/", validateBody(createAssignmentSchema), AssignmentController.create);
router.put("/:id", validateParams(idParamSchema), validateBody(updateAssignmentSchema), AssignmentController.update);
router.delete("/:id", validateParams(idParamSchema), AssignmentController.delete);

export default router;
