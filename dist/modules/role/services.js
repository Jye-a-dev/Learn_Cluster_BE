import { RoleModel } from "../role/model.js";
export const RoleService = {
    getAll: () => RoleModel.getAll(),
    getById: (id) => RoleModel.getById(id),
    create: (role) => RoleModel.create(role),
    update: (id, data) => RoleModel.update(id, data),
    delete: (id) => RoleModel.delete(id),
    count: () => RoleModel.count(),
};
