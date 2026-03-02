// src/@types/message.d.ts
export interface Message {
	id: number; // INT AUTO_INCREMENT
	study_date_id: number;
	sender_id?: string | null; // CHAR(36) -> User.id
	content?: string | null;
	sent_at?: string | null; // TIMESTAMP
}
