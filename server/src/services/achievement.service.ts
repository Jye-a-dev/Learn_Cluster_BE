// src/services/achievement.service.ts
import type { Achievement } from "../@types/achievement.js";
import { AchievementModel } from "../models/achievement.model.js";

export const AchievementService = {
	getAll: (query?: any) => AchievementModel.getAll(),
	getById: (id: number) => AchievementModel.getById(id),
	getByUser: (user_id: string) => AchievementModel.getByUser(user_id),
	create: (achievement: Partial<Achievement>) => AchievementModel.create(achievement),
	bulkCreate: (achievements: Partial<Achievement>[]) => AchievementModel.bulkCreate(achievements),
	update: (id: number, data: Partial<Achievement>) => AchievementModel.update(id, data),
	delete: (id: number) => AchievementModel.delete(id),
	deleteByUser: (user_id: string) => AchievementModel.deleteByUser(user_id),
	count: () => AchievementModel.count(),
};
