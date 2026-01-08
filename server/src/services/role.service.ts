// src/services/role.service.ts
import type { Role } from "../@types/role.js";
import { RoleModel } from "../models/role.model.js";

export const RoleService = {
	getAll: () => RoleModel.getAll(),
	getById: (id: number) => RoleModel.getById(id),
	create: (role: Partial<Role>) => RoleModel.create(role),
	update: (id: number, data: Partial<Role>) => RoleModel.update(id, data),
	delete: (id: number) => RoleModel.delete(id),
	count: () => RoleModel.count(),
};
