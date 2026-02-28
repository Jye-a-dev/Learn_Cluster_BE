// src/@types/notification.d.ts
export interface Notification {
	id: string; // UUID (CHAR 36)

	sender_id: string | null; // NULL = system
	user_id: string; // người nhận

	type: string | null;

	reference_id: string | null;
	reference_type: string | null;

	content: string | null;

	is_read: boolean;

	created_at: string; // TIMESTAMP
}
