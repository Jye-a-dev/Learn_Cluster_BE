// src/@types/role-permission.d.ts
export interface RolePermission {
	id: number | string;        // API/FE string, DB number
	role_id: number;
	permission_id: number;
	created_at: string;
}
