import type { Enrollment } from "../@types/enrollment.js";
import { EnrollmentModel } from "../models/enrollment.model.js";

export const EnrollmentService = {
	getAll: () => EnrollmentModel.getAll(),
	getById: (id: number) => EnrollmentModel.getById(id),
	create: (data: Partial<Enrollment>) => EnrollmentModel.create(data),
	update: (id: number, data: Partial<Enrollment>) => EnrollmentModel.update(id, data),
	delete: (id: number) => EnrollmentModel.delete(id),
	count: () => EnrollmentModel.count(),
};
