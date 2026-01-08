import type { Bookmark } from "../@types/bookmark.js";
import { BookmarkModel } from "../models/bookmark.model.js";

export const BookmarkService = {
	getAll: (query?: any) => BookmarkModel.getAll(),

	getById: (id: number) => BookmarkModel.getById(id),

	getByUser: (user_id: string) => BookmarkModel.getByUser(user_id),

	getByLesson: (lesson_id: number) => BookmarkModel.getByLesson(lesson_id),

	create: (bookmark: Partial<Bookmark>) => BookmarkModel.create(bookmark),

	update: (id: number, data: Partial<Bookmark>) => BookmarkModel.update(id, data),

	delete: (id: number) => BookmarkModel.delete(id),

	deleteByUserLesson: (user_id: string, lesson_id: number) => BookmarkModel.deleteByUserLesson(user_id, lesson_id),

	count: () => BookmarkModel.count(),
};
