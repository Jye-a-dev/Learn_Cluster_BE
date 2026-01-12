import type { Submission } from "../@types/submission.js";
import { SubmissionModel } from "../models/submission.model.js";

export const SubmissionService = {
	getAll: () => SubmissionModel.getAll(),
	getById: (id: number) => SubmissionModel.getById(id),
	create: (data: Partial<Submission>) => SubmissionModel.create(data),
	update: (id: number, data: Partial<Submission>) => SubmissionModel.update(id, data),
	delete: (id: number) => SubmissionModel.delete(id),
	count: () => SubmissionModel.count(),
	getByAssignment: (assignment_id: number) => SubmissionModel.getByAssignment(assignment_id),

	countByAssignment: (assignment_id: number) => SubmissionModel.countByAssignment(assignment_id),

	getByStudent: (student_id: string) => SubmissionModel.getByStudent(student_id),

	countByStudent: (student_id: string) => SubmissionModel.countByStudent(student_id),

	getByAssignmentAndStudent: (assignment_id: number, student_id: string) => SubmissionModel.getByAssignmentAndStudent(assignment_id, student_id),
};
