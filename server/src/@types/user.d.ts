// src/@types/user.d.ts
export interface User {
	id: string; // CHAR(36) UUID
	username: string;
	email: string;
	password_hash: string;
	role_id?: string | number | null;
	created_at?: string | null; // timestamp
	updated_at?: string | null; // timestamp
}
