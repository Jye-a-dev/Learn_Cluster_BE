import type { Grade } from "../grade/types.js";
import { GradeModel } from "../grade/model.js";

export const GradeService = {
	getAll: () => GradeModel.getAll(),
	getById: (id: number) => GradeModel.getById(id),
	create: (data: Partial<Grade>) => GradeModel.create(data),
	update: (id: number, data: Partial<Grade>) => GradeModel.update(id, data),
	delete: (id: number) => GradeModel.delete(id),
	count: () => GradeModel.count(),
	getBySubmission: (submission_id: number) => GradeModel.getBySubmission(submission_id),
	getByGrader: (grader_id: string) => GradeModel.getByGrader(grader_id),
	updateFeedback: (id: number, feedback: string | null) => GradeModel.updateFeedback(id, feedback),
	getTop: (n: number) => GradeModel.getTop(n),
};
