import { AssignmentModel } from "../assigment/model.js";
export const AssignmentService = {
    getAll: (query) => AssignmentModel.getAll(query),
    getById: (id) => AssignmentModel.getById(id),
    getByCourse: (courseId) => AssignmentModel.getByCourse(courseId),
    create: (data) => AssignmentModel.create(data),
    update: (id, data) => AssignmentModel.update(id, data),
    delete: (id) => AssignmentModel.delete(id),
    deleteByCourse: (courseId) => AssignmentModel.deleteByCourse(courseId),
    count: () => AssignmentModel.count(),
};
