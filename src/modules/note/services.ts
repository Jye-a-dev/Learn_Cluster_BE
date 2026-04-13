// src/services/services.ts
import type { Note } from "../note/types.js";
import { NoteModel } from "../note/model.js";

export const NoteService = {
	getAll: (query?: any) => NoteModel.getAll(),

	getById: (id: string) => NoteModel.getById(id),

	getByUser: (user_id: string) => NoteModel.getByUser(user_id),

	create: (note: Partial<Note>) => NoteModel.create(note),

	update: (id: string, data: Partial<Note>) => NoteModel.update(id, data),

	delete: (id: string) => NoteModel.delete(id),

	count: () => NoteModel.count(),

	getByLesson: (lesson_id: string) => NoteModel.getByLesson(lesson_id),
};
