import type { StudyDate } from "../studyDate/study_date.js";
import { StudyDateModel } from "../studyDate/study_date.model.js";

export const StudyDateService = {
	getAll: () => StudyDateModel.getAll(),

	getById: (id: string) => StudyDateModel.getById(id),

	getFullById: (id: string) => StudyDateModel.getFullById(id),

	getByCourse: (course_id: string) => StudyDateModel.getByCourse(course_id),

	create: (data: Partial<StudyDate>) => StudyDateModel.create(data),

	update: (id: string, data: Partial<StudyDate>) => StudyDateModel.update(id, data),


	delete: (id: string) => StudyDateModel.delete(id),

	count: () => StudyDateModel.count(),

	getUpcoming: () => StudyDateModel.getUpcoming(),

	query: (filters: any) => StudyDateModel.query(filters),
};
