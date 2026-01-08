// src/@types/study_date_participant.d.ts
export interface StudyDateParticipant {
	id: number; // INT AUTO_INCREMENT
	study_date_id: number;
	user_id: string; // CHAR(36) -> User.id
	joined_at?: string | null; // TIMESTAMP
}
