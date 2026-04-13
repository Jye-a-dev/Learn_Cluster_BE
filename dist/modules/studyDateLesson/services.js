import { StudyDateLessonModel } from "../studyDateLesson/model.js";
export const StudyDateLessonService = {
    getAll: (query) => (query ? StudyDateLessonModel.getFiltered(query) : StudyDateLessonModel.getAll()),
    getById: (id) => StudyDateLessonModel.getById(id),
    create: (data) => StudyDateLessonModel.create(data),
    update: (id, data) => StudyDateLessonModel.update(id, data),
    delete: (id) => StudyDateLessonModel.delete(id),
    count: (study_date_id, lesson_id) => StudyDateLessonModel.countFiltered(study_date_id, lesson_id),
};
