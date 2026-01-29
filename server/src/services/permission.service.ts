import type { Permission } from "../@types/permission.js";
import { PermissionModel } from "../models/permission.model.js";

export const PermissionService = {
	getAll: (page: number, limit: number, keyword?: string) => PermissionModel.getAll(page, limit, keyword),

	getById: (id: number) => PermissionModel.getById(id),

	create: (data: Partial<Permission>) => PermissionModel.create(data),

	update: (id: number, data: Partial<Permission>) => PermissionModel.update(id, data),

	delete: (id: number) => PermissionModel.delete(id),

	count: () => PermissionModel.count(),
};