// src/@types/bookmark.d.ts
export interface Bookmark {
	id: number;            // AUTO_INCREMENT
	user_id: string;       // CHAR(36) UUID
	lesson_id: number;     // INT
	created_at?: string | null; // TIMESTAMP
}
