import type { Enrollment } from "../@types/enrollment.js";
import { EnrollmentModel } from "../models/enrollment.model.js";

export const EnrollmentService = {
	getAll: () => EnrollmentModel.getAll(),
	getById: (id: number) => EnrollmentModel.getById(id),
	getByUser: (user_id: string) => EnrollmentModel.getByUser(user_id),
	getByCourse: (course_id: number) => EnrollmentModel.getByCourse(course_id),
	create: (data: Partial<Enrollment>) => EnrollmentModel.create(data),
	update: (id: number, data: Partial<Enrollment>) => EnrollmentModel.update(id, data),
	delete: (id: number) => EnrollmentModel.delete(id),
	count: () => EnrollmentModel.count(),
	countFiltered: (user_id?: string, course_id?: number) => EnrollmentModel.countFiltered(user_id, course_id),
	getFiltered: (options: { user_id?: string; course_id?: number; page?: number; limit?: number }) =>
		EnrollmentModel.getFiltered(options),
};
