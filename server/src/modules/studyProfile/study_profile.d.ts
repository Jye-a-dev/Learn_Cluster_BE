export interface StudyProfile {
	id: string; // CHAR(36)
	user_id: string; // CHAR(36) UNIQUE
	bio?: string | null;
	preferred_subject?: string | null;
	level?: "Beginner" | "Intermediate" | "Advanced" | null;
	learning_goal?: string | null;
	available_time?: any | null; // JSON
	is_active?: boolean;
}