import { EnrollmentModel } from "../enrollment/model.js";
export const EnrollmentService = {
    getAll: () => EnrollmentModel.getAll(),
    getById: (id) => EnrollmentModel.getById(id),
    getByUser: (user_id) => EnrollmentModel.getByUser(user_id),
    getByCourse: (course_id) => EnrollmentModel.getByCourse(course_id),
    create: (data) => EnrollmentModel.create(data),
    update: (id, data) => EnrollmentModel.update(id, data),
    delete: (id) => EnrollmentModel.delete(id),
    count: () => EnrollmentModel.count(),
    countStudentByCourse: (course_id) => EnrollmentModel.countStudentByCourse(course_id),
    countFiltered: (user_id, course_id) => EnrollmentModel.countFiltered(user_id, course_id),
    getFiltered: (options) => EnrollmentModel.getFiltered(options),
};
