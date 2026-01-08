// src/services/role-permission.service.ts
import type { RolePermission } from "../@types/role_permission.js";
import { RolePermissionModel } from "../models/role_permission.model.js";

export const RolePermissionService = {
	getAll: () => RolePermissionModel.getAll(),

	getByRoleId: (role_id: number) => RolePermissionModel.getByRoleId(role_id),

	add: (role_id: number, permission_id: number) => RolePermissionModel.add(role_id, permission_id),

	remove: (role_id: number, permission_id: number) => RolePermissionModel.remove(role_id, permission_id),

	removeByRole: (role_id: number) => RolePermissionModel.removeByRole(role_id),

	countByRole: (role_id: number) => RolePermissionModel.countByRole(role_id),
};
