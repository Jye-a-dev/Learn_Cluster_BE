export type SwipeStatus = "pending" | "accepted" | "rejected";

export interface StudySwipe {
  id?: string;
  status?: SwipeStatus;
  [key: string]: any;
}