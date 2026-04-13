import { StudyProfileModel } from "./model.js";
export const StudyProfileService = {
    getAll: (query) => StudyProfileModel.getAll(query),
    getById: (id) => StudyProfileModel.getById(id),
    getByUserId: (userId) => StudyProfileModel.getByUserId(userId),
    create: (data) => StudyProfileModel.create(data),
    update: (id, data) => StudyProfileModel.update(id, data),
    delete: (id) => StudyProfileModel.delete(id),
    count: () => StudyProfileModel.count(),
};
