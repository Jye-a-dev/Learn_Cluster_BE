import { SubmissionModel } from "../submission/model.js";
export const SubmissionService = {
    getAll: () => SubmissionModel.getAll(),
    getById: (id) => SubmissionModel.getById(id),
    create: (data) => SubmissionModel.create(data),
    update: (id, data) => SubmissionModel.update(id, data),
    delete: (id) => SubmissionModel.delete(id),
    count: () => SubmissionModel.count(),
    getByAssignment: (assignment_id) => SubmissionModel.getByAssignment(assignment_id),
    countByAssignment: (assignment_id) => SubmissionModel.countByAssignment(assignment_id),
    getByStudent: (student_id) => SubmissionModel.getByStudent(student_id),
    countByStudent: (student_id) => SubmissionModel.countByStudent(student_id),
    getByAssignmentAndStudent: (assignment_id, student_id) => SubmissionModel.getByAssignmentAndStudent(assignment_id, student_id),
};
