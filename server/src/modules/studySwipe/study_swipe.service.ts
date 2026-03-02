import type { StudySwipe } from "./study_swipe.js";
import { StudySwipeModel } from "./study_swipe.model.js";

export const StudySwipeService = {
	getAll: (query?: any) => StudySwipeModel.getAll(query),
	getById: (id: string) => StudySwipeModel.getById(id),
	getByUsers: (swiperId: string, targetId: string) =>
		StudySwipeModel.getByUsers(swiperId, targetId),
	create: (data: Partial<StudySwipe>) =>
		StudySwipeModel.create(data),
	update: (id: string, data: Partial<StudySwipe>) =>
		StudySwipeModel.update(id, data),
	delete: (id: string) => StudySwipeModel.delete(id),
	deleteByUsers: (swiperId: string, targetId: string) =>
		StudySwipeModel.deleteByUsers(swiperId, targetId),
	count: () => StudySwipeModel.count(),
};