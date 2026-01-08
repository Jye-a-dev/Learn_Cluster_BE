import type { Submission } from "../@types/submission.js";
import { SubmissionModel } from "../models/submission.model.js";

export const SubmissionService = {
	getAll: () => SubmissionModel.getAll(),
	getById: (id: number) => SubmissionModel.getById(id),
	create: (data: Partial<Submission>) => SubmissionModel.create(data),
	update: (id: number, data: Partial<Submission>) => SubmissionModel.update(id, data),
	delete: (id: number) => SubmissionModel.delete(id),
	count: () => SubmissionModel.count(),
};
