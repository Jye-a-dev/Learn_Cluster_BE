// src/@types/achievement.d.ts
export interface Achievement {
	id: number;            // AUTO_INCREMENT
	user_id: string;       // CHAR(36) UUID
	name?: string | null;  // VARCHAR(100)
	description?: string | null;
	awarded_at?: string | null; // TIMESTAMP
}
