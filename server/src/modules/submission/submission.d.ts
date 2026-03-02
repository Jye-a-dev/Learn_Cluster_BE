export interface Submission {
	id: number; // INT AUTO_INCREMENT
	assignment_id: number; // INT
	student_id: string; // CHAR(36) UUID
	file_url?: string | null;
	text_submission?: string | null;
	submitted_at?: string | null; // timestamp
}
