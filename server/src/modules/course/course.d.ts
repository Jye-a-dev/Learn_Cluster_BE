export type CourseStatus = "draft" | "public" | "closed";

export interface Course {
	id?: string; // UUID CHAR(36)
	title: string;
	description?: string | null;
	objective?: string | null;
	duration_hours?: number | null;
	status?: CourseStatus;
	created_at?: string | null;
	updated_at?: string | null;
}
