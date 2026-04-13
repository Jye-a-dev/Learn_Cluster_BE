// src/routes/routes.ts
import { Router } from "express";
import { NoteController } from "../note/controller.js";
import { createNoteSchema, updateNoteSchema, noteIdParamSchema, queryNotesSchema, noteUserIdParamSchema, noteLessonIdParamSchema, } from "../note/validators.js";
import { validateBody, validateParams, validateQuery } from "../../middlewares/validate.middleware.js";
const router = Router();
router.get("/", validateQuery(queryNotesSchema), NoteController.getAll);
router.get("/id/:id", validateParams(noteIdParamSchema), NoteController.getById);
router.get("/user/:user_id", validateParams(noteUserIdParamSchema), NoteController.getByUser);
router.get("/lesson/:lesson_id", validateParams(noteLessonIdParamSchema), NoteController.getByLesson);
router.post("/", validateBody(createNoteSchema), NoteController.create);
router.put("/id/:id", validateParams(noteIdParamSchema), validateBody(updateNoteSchema), NoteController.update);
router.patch("/id/:id", validateParams(noteIdParamSchema), validateBody(updateNoteSchema), NoteController.update);
router.delete("/id/:id", validateParams(noteIdParamSchema), NoteController.delete);
export default router;
