export interface Enrollment {
	id: number; // INT AUTO_INCREMENT
	user_id: string; // CHAR(36) UUID
	course_id: number; // INT
	enrolled_at?: string | null; // timestamp
}
