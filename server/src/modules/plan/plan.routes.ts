import { Router } from "express";
import { PlanController } from "../plan/plan.controller.js";
import { createPlanSchema, updatePlanSchema, planIdParamSchema } from "../plan/plan.validator.js";
import { validateBody, validateParams } from "../../middlewares/validate.middleware.js";

const router = Router();

// ===== GET ALL =====
router.get("/", PlanController.getAll);

// ===== GET COUNT =====
router.get("/count", PlanController.count);

// ===== GET BY ID =====
router.get("/id/:id", validateParams(planIdParamSchema), PlanController.getById);

// ===== CREATE =====
router.post("/", validateBody(createPlanSchema), PlanController.create);

// ===== UPDATE =====
router.put("/id/:id", validateParams(planIdParamSchema), validateBody(updatePlanSchema), PlanController.update);

router.patch("/id/:id", validateParams(planIdParamSchema), validateBody(updatePlanSchema), PlanController.update);

// ===== DELETE =====
router.delete("/id/:id", validateParams(planIdParamSchema), PlanController.delete);

export default router;
