// src/@types/study_date.d.ts
export interface StudyDate {
	id: number; // INT AUTO_INCREMENT
	course_id: number;
	title?: string | null;
	lesson_ids?: any[] | null; // JSON
	scheduled_at?: string | null; // DATETIME
	location?: string | null;
	created_by?: string | null; // CHAR(36) -> User.id
}
