export type CourseInstructorRole = "Teacher" | "TA" | "Moderator";

export interface CourseInstructor {
	id?: string;                // UUID
	course_id: string;
	user_id: string;
	role_in_course: "Teacher" | "TA" | "Moderator";
	created_at?: string;
}
