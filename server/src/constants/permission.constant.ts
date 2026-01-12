export const PERMISSIONS = {
	MANAGE_USERS: "manage_users",
	MANAGE_REPORTS: "manage_reports",
	REVIEW_FEEDBACK: "review_feedback",
	MANAGE_NOTIFICATIONS: "manage_notifications",

	VIEW_COURSE_CONTENT: "view_course_content",
	MANAGE_COURSES: "manage_courses",
	MANAGE_CHAPTERS_LESSONS: "manage_chapters_lessons",
	MANAGE_ASSIGNMENTS: "manage_assignments",
	GRADE_SUBMISSIONS: "grade_submissions",

	JOIN_COURSE: "join_course",
	SUBMIT_ASSIGNMENT: "submit_assignment",
	CREATE_NOTES_BOOKMARKS: "create_notes_bookmarks",
	EARN_ACHIEVEMENTS: "earn_achievements",

	SEND_MESSAGES: "send_messages",

	MANAGE_STUDY_DATES: "manage_study_dates",
	MANAGE_PARTICIPANTS: "manage_participants",

	MODERATE_CONTENT: "moderate_content",
	VIEW_STATISTICS: "view_statistics",
	MANAGE_ROLES: "manage_roles",
} as const;

export type PermissionName = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
