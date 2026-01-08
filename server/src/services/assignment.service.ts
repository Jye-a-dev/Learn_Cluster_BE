import type { Assignment } from "../@types/assignment.js";
import { AssignmentModel } from "../models/assignment.model.js";

export const AssignmentService = {
	getAll: (query?: any) => AssignmentModel.getAll(query),
	getById: (id: number) => AssignmentModel.getById(id),
	getByCourse: (courseId: number) => AssignmentModel.getByCourse(courseId),
	create: (data: Partial<Assignment>) => AssignmentModel.create(data),
	update: (id: number, data: Partial<Assignment>) =>
		AssignmentModel.update(id, data),
	delete: (id: number) => AssignmentModel.delete(id),
	deleteByCourse: (courseId: number) =>
		AssignmentModel.deleteByCourse(courseId),
	count: () => AssignmentModel.count(),
};
