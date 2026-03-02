import type { StudyProfile } from "./study_profile.js";
import { StudyProfileModel } from "./study_profile.model.js";

export const StudyProfileService = {
	getAll: (query?: any) => StudyProfileModel.getAll(query),
	getById: (id: string) => StudyProfileModel.getById(id),
	getByUserId: (userId: string) => StudyProfileModel.getByUserId(userId),
	create: (data: Partial<StudyProfile>) => StudyProfileModel.create(data),
	update: (id: string, data: Partial<StudyProfile>) =>
		StudyProfileModel.update(id, data),
	delete: (id: string) => StudyProfileModel.delete(id),
	count: () => StudyProfileModel.count(),
};