import type { StudyMatch } from "./types.js";
import { StudyMatchModel } from "./model.js";

export const StudyMatchService = {
	getAll: (query?: any) => StudyMatchModel.getAll(query),
	getById: (id: string) => StudyMatchModel.getById(id),
	getByUsers: (user1: string, user2: string) => StudyMatchModel.getByUsers(user1, user2),
	create: (data: Partial<StudyMatch>) => StudyMatchModel.create(data),
	delete: (id: string) => StudyMatchModel.delete(id),
	deleteByUsers: (user1: string, user2: string) => StudyMatchModel.deleteByUsers(user1, user2),
	count: () => StudyMatchModel.count(),
};
