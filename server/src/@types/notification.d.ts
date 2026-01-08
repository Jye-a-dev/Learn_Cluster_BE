// src/@types/notification.d.ts
export interface Notification {
	id: number; // INT AUTO_INCREMENT
	user_id: string; // CHAR(36) -> User.id
	type?: string | null;
	content?: string | null;
	is_read?: boolean; // BOOLEAN
	created_at?: string | null; // TIMESTAMP
}
