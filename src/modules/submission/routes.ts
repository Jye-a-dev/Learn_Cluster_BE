import { Router } from "express";
import { SubmissionController } from "../submission/controller.js";
import {
	createSubmissionSchema,
	updateSubmissionSchema,
	idParamSchema,
	assignmentIdParamSchema,
	studentIdParamSchema,
	assignmentStudentParamSchema,
} from "../submission/validators.js";
import { validateBody, validateParams } from "../../middlewares/validate.middleware.js";

const router = Router();

router.get("/", SubmissionController.getAll);
router.get("/count", SubmissionController.count);
router.get("/id/:id", validateParams(idParamSchema), SubmissionController.getById);

router.post("/", validateBody(createSubmissionSchema), SubmissionController.create);
router.put("/id/:id", validateParams(idParamSchema), validateBody(updateSubmissionSchema), SubmissionController.update);
router.patch("/id/:id", validateParams(idParamSchema), validateBody(updateSubmissionSchema), SubmissionController.update);
router.delete("/id/:id", validateParams(idParamSchema), SubmissionController.delete);
router.get("/assignment/:assignment_id", validateParams(assignmentIdParamSchema), SubmissionController.getByAssignment);

router.get("/assignment/:assignment_id/count", validateParams(assignmentIdParamSchema), SubmissionController.countByAssignment);

router.get("/student/:student_id", validateParams(studentIdParamSchema), SubmissionController.getByStudent);

router.get("/student/:student_id/count", validateParams(studentIdParamSchema), SubmissionController.countByStudent);

router.get("/assignment/:assignment_id/student/:student_id", validateParams(assignmentStudentParamSchema), SubmissionController.checkSubmitted);
export default router;
