// src/routes/note.routes.ts
import { Router } from "express";
import { NoteController } from "../controllers/note.controller.js";
import {
	createNoteSchema,
	updateNoteSchema,
	noteIdParamSchema,
	queryNotesSchema,
	noteUserIdParamSchema,
	noteLessonIdParamSchema,
} from "../validators/note.validator.js";
import { validateBody, validateParams, validateQuery } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", validateQuery(queryNotesSchema), NoteController.getAll);
router.get("/:id", validateParams(noteIdParamSchema), NoteController.getById);
router.get("/user/:user_id", validateParams(noteUserIdParamSchema), NoteController.getByUser);
router.get("/lesson/:lesson_id", validateParams(noteLessonIdParamSchema), NoteController.getByLesson);

router.post("/", validateBody(createNoteSchema), NoteController.create);
router.put("/:id", validateParams(noteIdParamSchema), validateBody(updateNoteSchema), NoteController.update);
router.patch("/:id", validateParams(noteIdParamSchema), validateBody(updateNoteSchema), NoteController.update);
router.delete("/:id", validateParams(noteIdParamSchema), NoteController.delete);

export default router;
