export const ROLES = {
	ADMIN: "Admin",
	MODERATOR: "Moderator",
	TEACHER: "Teacher",
	TA: "TA",
	STUDENT: "Student",
} as const;

export type RoleName = (typeof ROLES)[keyof typeof ROLES];
