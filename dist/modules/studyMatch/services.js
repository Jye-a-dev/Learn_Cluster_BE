import { StudyMatchModel } from "./model.js";
export const StudyMatchService = {
    getAll: (query) => StudyMatchModel.getAll(query),
    getById: (id) => StudyMatchModel.getById(id),
    getByUsers: (user1, user2) => StudyMatchModel.getByUsers(user1, user2),
    create: (data) => StudyMatchModel.create(data),
    delete: (id) => StudyMatchModel.delete(id),
    deleteByUsers: (user1, user2) => StudyMatchModel.deleteByUsers(user1, user2),
    count: () => StudyMatchModel.count(),
};
