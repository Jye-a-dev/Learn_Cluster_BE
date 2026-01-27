import { RolePermissionModel } from "../models/role_permission.model.js";

export const RolePermissionService = {
	/* ---------- GET ---------- */

	getAll() {
		return RolePermissionModel.getAll();
	},

	getById(id: string) {
		return RolePermissionModel.getById(id);
	},

	getByRoleId(role_id: string) {
		return RolePermissionModel.getByRoleId(role_id);
	},

	getByPermissionId(permission_id: string) {
		return RolePermissionModel.getByPermissionId(permission_id);
	},

	/* ---------- CREATE ---------- */

	add(role_id: string, permission_id: string) {
		return RolePermissionModel.add(role_id, permission_id);
	},

	/* ---------- DELETE ---------- */

	removeById(id: string) {
		return RolePermissionModel.removeById(id);
	},

	remove(role_id: string, permission_id: string) {
		return RolePermissionModel.remove(role_id, permission_id);
	},

	removeByRole(role_id: string) {
		return RolePermissionModel.removeByRole(role_id);
	},

	removeByPermission(permission_id: string) {
		return RolePermissionModel.removeByPermission(permission_id);
	},

	/* ---------- COUNT ---------- */

	countByRole(role_id: string) {
		return RolePermissionModel.countByRole(role_id);
	},

	countByPermission(permission_id: string) {
		return RolePermissionModel.countByPermission(permission_id);
	},
	putById(
		id: string,
		data: {
			role_id: string;
			permission_id: string;
		},
	) {
		return RolePermissionModel.updateById(id, data);
	},

	/* PATCH = update từng phần */
	patchById(
		id: string,
		data: {
			role_id?: string;
			permission_id?: string;
		},
	) {
		return RolePermissionModel.updateById(id, data);
	},
};
