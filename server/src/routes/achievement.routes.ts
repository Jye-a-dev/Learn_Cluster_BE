// src/routes/achievement.routes.ts
import { Router } from "express";
import { AchievementController } from "../controllers/achievement.controller.js";
import { createAchievementSchema, updateAchievementSchema, achievementIdParamSchema, queryAchievementsSchema } from "../validators/achievement.validator.js";
import { validateBody, validateParams, validateQuery } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", validateQuery(queryAchievementsSchema), AchievementController.getAll);
router.get("/:id", validateParams(achievementIdParamSchema), AchievementController.getById);

router.post("/", validateBody(createAchievementSchema), AchievementController.create);
router.put("/:id", validateParams(achievementIdParamSchema), validateBody(updateAchievementSchema), AchievementController.update);
router.delete("/:id", validateParams(achievementIdParamSchema), AchievementController.delete);

export default router;
