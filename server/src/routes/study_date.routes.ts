import { Router } from "express";
import { StudyDateController } from "../controllers/study_date.controller.js";
import {
	createStudyDateSchema,
	updateStudyDateSchema,
	idParamSchema,
	queryStudyDatesSchema,
} from "../validators/study_date.validator.js";
import {
	validateBody,
	validateParams,
	validateQuery,
} from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", validateQuery(queryStudyDatesSchema), StudyDateController.getAll);
router.get("/count", StudyDateController.count);
router.get("/:id", validateParams(idParamSchema), StudyDateController.getById);
router.get("/:id/full", validateParams(idParamSchema), StudyDateController.getFullById);

router.post("/", validateBody(createStudyDateSchema), StudyDateController.create);
router.put(
	"/:id",
	validateParams(idParamSchema),
	validateBody(updateStudyDateSchema),
	StudyDateController.update
);
router.delete("/:id", validateParams(idParamSchema), StudyDateController.delete);

export default router;
