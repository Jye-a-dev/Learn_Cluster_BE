import { BookmarkModel } from "../bookmark/model.js";
export const BookmarkService = {
    getAll: (query) => BookmarkModel.getAll(),
    getById: (id) => BookmarkModel.getById(id),
    getByUser: (user_id) => BookmarkModel.getByUser(user_id),
    getByLesson: (lesson_id) => BookmarkModel.getByLesson(lesson_id),
    create: (bookmark) => BookmarkModel.create(bookmark),
    update: (id, data) => BookmarkModel.update(id, data),
    delete: (id) => BookmarkModel.delete(id),
    deleteByUserLesson: (user_id, lesson_id) => BookmarkModel.deleteByUserLesson(user_id, lesson_id),
    count: () => BookmarkModel.count(),
};
