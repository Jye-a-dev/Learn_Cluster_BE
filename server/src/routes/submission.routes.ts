import { Router } from "express";
import { SubmissionController } from "../controllers/submission.controller.js";
import { createSubmissionSchema, updateSubmissionSchema, idParamSchema } from "../validators/submission.validator.js";
import { validateBody, validateParams } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", SubmissionController.getAll);
router.get("/count", SubmissionController.count);
router.get("/:id", validateParams(idParamSchema), SubmissionController.getById);

router.post("/", validateBody(createSubmissionSchema), SubmissionController.create);
router.put("/:id", validateParams(idParamSchema), validateBody(updateSubmissionSchema), SubmissionController.update);
router.delete("/:id", validateParams(idParamSchema), SubmissionController.delete);

export default router;
