import { StudySwipeModel } from "./model.js";
export const StudySwipeService = {
    getAll: (query) => StudySwipeModel.getAll(query),
    getById: (id) => StudySwipeModel.getById(id),
    getByUsers: (swiperId, targetId) => StudySwipeModel.getByUsers(swiperId, targetId),
    create: (data) => StudySwipeModel.create(data),
    update: (id, data) => StudySwipeModel.update(id, data),
    delete: (id) => StudySwipeModel.delete(id),
    deleteByUsers: (swiperId, targetId) => StudySwipeModel.deleteByUsers(swiperId, targetId),
    count: () => StudySwipeModel.count(),
};
