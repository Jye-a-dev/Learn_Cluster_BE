// src/services/study_date.service.ts
import type { StudyDate } from "../@types/study_date.js";
import { StudyDateModel } from "../models/study_date.model.js";

export const StudyDateService = {
	getAll: () => StudyDateModel.getAll(),
	getById: (id: number) => StudyDateModel.getById(id),

	getFullById: (id: number) => StudyDateModel.getFullById(id),

	getByCourse: (course_id: number) => StudyDateModel.getByCourse(course_id),

	create: (data: Partial<StudyDate>) => StudyDateModel.create(data),

	update: (id: number, data: Partial<StudyDate>) => StudyDateModel.update(id, data),
	updateLessons: (id: number, lesson_ids: number[]) => StudyDateModel.updateLessons(id, lesson_ids),

	delete: (id: number) => StudyDateModel.delete(id),

	count: () => StudyDateModel.count(),
	getUpcoming: () => StudyDateModel.getUpcoming(),

	query: (filters: any) => StudyDateModel.query(filters),
};
