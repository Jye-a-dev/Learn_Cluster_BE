import { AchievementModel } from "../achievement/model.js";
export const AchievementService = {
    getAll: () => AchievementModel.getAll(),
    getById: (id) => AchievementModel.getById(id),
    getByUser: (user_id) => AchievementModel.getByUser(user_id),
    create: (achievement) => AchievementModel.create(achievement),
    bulkCreate: (achievements) => AchievementModel.bulkCreate(achievements),
    update: (id, data) => AchievementModel.update(id, data),
    delete: (id) => AchievementModel.delete(id),
    deleteByUser: (user_id) => AchievementModel.deleteByUser(user_id),
    count: () => AchievementModel.count(),
};
