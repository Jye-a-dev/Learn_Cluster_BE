// src/@types/role.d.ts
export interface Role {
	id: string; // CHAR(36) UUID
	name: string;
	description?: string | null;
}
