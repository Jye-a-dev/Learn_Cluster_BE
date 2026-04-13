import { GradeModel } from "../grade/model.js";
export const GradeService = {
    getAll: () => GradeModel.getAll(),
    getById: (id) => GradeModel.getById(id),
    create: (data) => GradeModel.create(data),
    update: (id, data) => GradeModel.update(id, data),
    delete: (id) => GradeModel.delete(id),
    count: () => GradeModel.count(),
    getBySubmission: (submission_id) => GradeModel.getBySubmission(submission_id),
    getByGrader: (grader_id) => GradeModel.getByGrader(grader_id),
    updateFeedback: (id, feedback) => GradeModel.updateFeedback(id, feedback),
    getTop: (n) => GradeModel.getTop(n),
};
