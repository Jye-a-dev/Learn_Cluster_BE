// src/@types/role-permission.d.ts
export interface RolePermission {
	role_id: number; // INT (FK -> roles.id)
	permission_id: number; // INT (FK -> permissions.id)
}
