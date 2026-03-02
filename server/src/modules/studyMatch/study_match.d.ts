export interface StudyMatch {
	id: string; // CHAR(36)
	user1_id: string; // CHAR(36)
	user2_id: string; // CHAR(36)
	matched_at?: string; // TIMESTAMP
}