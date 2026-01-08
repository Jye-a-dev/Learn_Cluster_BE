// src/@types/note.d.ts
export interface Note {
	id: number;            // AUTO_INCREMENT
	user_id: string;       // CHAR(36) UUID
	lesson_id: number;     // INT
	content?: string | null;
	created_at?: string | null; // TIMESTAMP
}
