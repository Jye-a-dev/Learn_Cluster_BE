// src/services/achievement.service.ts
import type { Achievement } from "../@types/achievement.js";
import { AchievementModel } from "../models/achievement.model.js";

export const AchievementService = {
	getAll: (query?: any) => AchievementModel.getAll(),
	getById: (id: number) => AchievementModel.getById(id),
	getByUser: (user_id: string) => AchievementModel.getByUser(user_id),
	create: (achievement: Partial<Achievement>) => AchievementModel.create(achievement),
	update: (id: number, data: Partial<Achievement>) => AchievementModel.update(id, data),
	delete: (id: number) => AchievementModel.delete(id),
	count: () => AchievementModel.count(),
};
