import { CourseModel } from "../course/model.js";
export const CourseService = {
    getAll: (query) => (query ? CourseModel.getFiltered(query) : CourseModel.getAll()),
    count: (status, search) => CourseModel.countFiltered(status, search),
    getById: (id) => CourseModel.getById(id),
    create: (course) => CourseModel.create(course),
    update: (id, data) => CourseModel.update(id, data),
    delete: (id) => CourseModel.delete(id),
    getFiltered: (query) => (query ? CourseModel.getFiltered(query) : CourseModel.getAll()),
};
