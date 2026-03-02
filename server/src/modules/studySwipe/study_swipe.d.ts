export type SwipeStatus = "pending" | "accepted" | "rejected";

export interface StudySwipe {
	id: string; // CHAR(36)
	swiper_id: string; // CHAR(36)
	target_id: string; // CHAR(36)
	status?: SwipeStatus;
	created_at?: string; // TIMESTAMP
}