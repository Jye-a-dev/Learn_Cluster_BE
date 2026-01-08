// src/@types/course.d.ts
export type CourseStatus = "draft" | "public" | "closed";

export interface Course {
	id?: number; // INT AUTO_INCREMENT
	title: string;
	description?: string | null;
	objective?: string | null;
	duration_hours?: number | null;
	status?: CourseStatus;
	teacher_id?: string | null; // UUID
	created_at?: string | null; // timestamp
	updated_at?: string | null; // timestamp
}
