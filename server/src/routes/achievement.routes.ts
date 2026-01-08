// src/routes/achievement.routes.ts
import { Router } from "express";
import { AchievementController } from "../controllers/achievement.controller.js";
import {
	createAchievementSchema,
	updateAchievementSchema,
	bulkCreateAchievementSchema,
	achievementIdParamSchema,
	userIdParamSchema,
	queryAchievementsSchema,
} from "../validators/achievement.validator.js";
import { validateBody, validateParams, validateQuery } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", validateQuery(queryAchievementsSchema), AchievementController.getAll);
router.get("/count", AchievementController.count);
router.get("/user/:userId", validateParams(userIdParamSchema), AchievementController.getByUser);
router.get("/:id", validateParams(achievementIdParamSchema), AchievementController.getById);

router.post("/", validateBody(createAchievementSchema), AchievementController.create);
router.post("/bulk", validateBody(bulkCreateAchievementSchema), AchievementController.bulkCreate);

router.put(
	"/:id",
	validateParams(achievementIdParamSchema),
	validateBody(updateAchievementSchema),
	AchievementController.update
);
router.patch(
	"/:id",
	validateParams(achievementIdParamSchema),
	validateBody(updateAchievementSchema),
	AchievementController.update
);

router.delete("/:id", validateParams(achievementIdParamSchema), AchievementController.delete);
router.delete(
	"/user/:userId",
	validateParams(userIdParamSchema),
	AchievementController.deleteByUser
);

export default router;
