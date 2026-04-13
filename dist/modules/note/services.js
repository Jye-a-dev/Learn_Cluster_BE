import { NoteModel } from "../note/model.js";
export const NoteService = {
    getAll: (query) => NoteModel.getAll(),
    getById: (id) => NoteModel.getById(id),
    getByUser: (user_id) => NoteModel.getByUser(user_id),
    create: (note) => NoteModel.create(note),
    update: (id, data) => NoteModel.update(id, data),
    delete: (id) => NoteModel.delete(id),
    count: () => NoteModel.count(),
    getByLesson: (lesson_id) => NoteModel.getByLesson(lesson_id),
};
