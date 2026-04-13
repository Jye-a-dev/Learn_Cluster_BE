import { StudyDateModel } from "../studyDate/model.js";
export const StudyDateService = {
    getAll: () => StudyDateModel.getAll(),
    getById: (id) => StudyDateModel.getById(id),
    getFullById: (id) => StudyDateModel.getFullById(id),
    getByCourse: (course_id) => StudyDateModel.getByCourse(course_id),
    create: (data) => StudyDateModel.create(data),
    update: (id, data) => StudyDateModel.update(id, data),
    delete: (id) => StudyDateModel.delete(id),
    count: () => StudyDateModel.count(),
    getUpcoming: () => StudyDateModel.getUpcoming(),
    query: (filters) => StudyDateModel.query(filters),
};
