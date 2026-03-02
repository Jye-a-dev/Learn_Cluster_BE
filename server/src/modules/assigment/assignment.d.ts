export interface Assignment {
	id: number; // INT AUTO_INCREMENT
	course_id: number; // INT
	title?: string | null;
	description?: string | null;
	file_url?: string | null;
	deadline?: string | null; // DATETIME
}
