import type { StudyDateLesson } from "../studyDateLesson/types.js";
import { StudyDateLessonModel } from "../studyDateLesson/model.js";

export const StudyDateLessonService = {
	getAll: (query?: any) => (query ? StudyDateLessonModel.getFiltered(query) : StudyDateLessonModel.getAll()),

	getById: (id: string) => StudyDateLessonModel.getById(id),

	create: (data: StudyDateLesson) => StudyDateLessonModel.create(data),

	update: (id: string, data: Partial<StudyDateLesson>) => StudyDateLessonModel.update(id, data),

	delete: (id: string) => StudyDateLessonModel.delete(id),

	count: (study_date_id?: string, lesson_id?: string) => StudyDateLessonModel.countFiltered(study_date_id, lesson_id),
};
