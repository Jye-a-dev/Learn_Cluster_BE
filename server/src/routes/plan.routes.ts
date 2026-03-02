import { Router } from "express";
import { PlanController } from "../modules/plan/plan.controller.js";
import { createPlanSchema, updatePlanSchema, planIdParamSchema } from "../modules/plan/plan.validator.js";
import { validateBody, validateParams } from "../middlewares/validate.middleware.js";

const router = Router();

// ===== GET ALL =====
router.get("/", PlanController.getAll);

// ===== GET COUNT =====
router.get("/count", PlanController.count);

// ===== GET BY ID =====
router.get("/:id", validateParams(planIdParamSchema), PlanController.getById);

// ===== CREATE =====
router.post("/", validateBody(createPlanSchema), PlanController.create);

// ===== UPDATE =====
router.put("/:id", validateParams(planIdParamSchema), validateBody(updatePlanSchema), PlanController.update);

router.patch("/:id", validateParams(planIdParamSchema), validateBody(updatePlanSchema), PlanController.update);

// ===== DELETE =====
router.delete("/:id", validateParams(planIdParamSchema), PlanController.delete);

export default router;
