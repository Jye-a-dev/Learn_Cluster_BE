import type { Chapter } from "../@types/chapter.js";
import { ChapterModel } from "../models/chapter.model.js";

export const ChapterService = {
	getAll: (query?: { course_id?: number; page?: number; limit?: number }) => ChapterModel.getAll(query),

	getById: (id: number) => ChapterModel.getById(id),

	getByCourse: (course_id: number) => ChapterModel.getByCourse(course_id),

	create: (chapter: Partial<Chapter>) => ChapterModel.create(chapter),

	update: (id: number, data: Partial<Chapter>) => ChapterModel.update(id, data),

	delete: (id: number) => ChapterModel.delete(id),

	count: (course_id?: number) => ChapterModel.count(course_id),
};
