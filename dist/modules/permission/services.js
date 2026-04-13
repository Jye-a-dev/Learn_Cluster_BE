import { PermissionModel } from "../permission/model.js";
export const PermissionService = {
    getAll: (page, limit, keyword) => PermissionModel.getAll(page, limit, keyword),
    getById: (id) => PermissionModel.getById(id),
    create: (data) => PermissionModel.create(data),
    update: (id, data) => PermissionModel.update(id, data),
    delete: (id) => PermissionModel.delete(id),
    count: () => PermissionModel.count(),
};
