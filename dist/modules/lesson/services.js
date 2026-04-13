import { LessonModel } from "../lesson/model.js";
export const LessonService = {
    getAll: () => LessonModel.getAll(),
    getById: (id) => LessonModel.getById(id),
    create: (lesson) => LessonModel.create(lesson),
    update: (id, data) => LessonModel.update(id, data),
    delete: (id) => LessonModel.delete(id),
    count: () => LessonModel.count(),
    getByChapter: (chapter_id) => LessonModel.getByChapter(chapter_id),
    updateOrder: (id, ordering) => LessonModel.updateOrder(id, ordering),
};
