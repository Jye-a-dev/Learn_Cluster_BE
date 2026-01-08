export interface Grade {
	id: number; // INT AUTO_INCREMENT
	submission_id: number; // INT
	grader_id?: string | null; // CHAR(36) UUID
	score?: number | null; // DECIMAL(5,2)
	feedback?: string | null;
	graded_at?: string | null; // timestamp
}
