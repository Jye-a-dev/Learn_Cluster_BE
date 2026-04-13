// src/services/services.ts
import type { Role } from "../role/types.js";
import { RoleModel } from "../role/model.js";

export const RoleService = {
	getAll: () => RoleModel.getAll(),
	getById: (id: number) => RoleModel.getById(id),
	create: (role: Partial<Role>) => RoleModel.create(role),
	update: (id: number, data: Partial<Role>) => RoleModel.update(id, data),
	delete: (id: number) => RoleModel.delete(id),
	count: () => RoleModel.count(),
};
