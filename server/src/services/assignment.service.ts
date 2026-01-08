import type { Assignment } from "../@types/assignment.js";
import { AssignmentModel } from "../models/assignment.model.js";

export const AssignmentService = {
	getAll: () => AssignmentModel.getAll(),
	getById: (id: number) => AssignmentModel.getById(id),
	create: (data: Partial<Assignment>) => AssignmentModel.create(data),
	update: (id: number, data: Partial<Assignment>) => AssignmentModel.update(id, data),
	delete: (id: number) => AssignmentModel.delete(id),
	count: () => AssignmentModel.count(),
};
