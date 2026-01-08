// src/services/note.service.ts
import type { Note } from "../@types/note.js";
import { NoteModel } from "../models/note.model.js";

export const NoteService = {
	getAll: (query?: any) => NoteModel.getAll(),
	getById: (id: number) => NoteModel.getById(id),
	getByUser: (user_id: string) => NoteModel.getByUser(user_id),
	create: (note: Partial<Note>) => NoteModel.create(note),
	update: (id: number, data: Partial<Note>) => NoteModel.update(id, data),
	delete: (id: number) => NoteModel.delete(id),
	count: () => NoteModel.count(),
	getByLesson: (lesson_id: number) => NoteModel.getByLesson(lesson_id),

};
