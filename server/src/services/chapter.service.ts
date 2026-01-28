import { ChapterModel } from "../models/chapter.model.js";
import type { Chapter } from "../@types/chapter.js";

export const ChapterService = {
	getAll(query?: { course_id?: string; page?: number; limit?: number }): Promise<Chapter[]> {
		return ChapterModel.getAll(query);
	},

	getById(id: string): Promise<Chapter | null> {
		return ChapterModel.getById(id);
	},

	getByCourse(course_id: string): Promise<Chapter[]> {
		return ChapterModel.getByCourse(course_id);
	},

	create(data: Partial<Chapter>) {
		return ChapterModel.create(data);
	},

	update(id: string, data: Partial<Chapter>) {
		return ChapterModel.update(id, data);
	},

	delete(id: string) {
		return ChapterModel.delete(id);
	},

	count(course_id?: string) {
		return ChapterModel.count(course_id);
	},
};
