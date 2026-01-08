import type { Grade } from "../@types/grade.js";
import { GradeModel } from "../models/grade.model.js";

export const GradeService = {
	getAll: () => GradeModel.getAll(),
	getById: (id: number) => GradeModel.getById(id),
	create: (data: Partial<Grade>) => GradeModel.create(data),
	update: (id: number, data: Partial<Grade>) => GradeModel.update(id, data),
	delete: (id: number) => GradeModel.delete(id),
	count: () => GradeModel.count(),
};
