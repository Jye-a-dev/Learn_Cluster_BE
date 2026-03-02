export type OrderStatus = "pending" | "paid" | "failed" | "cancelled";

export interface Order {
	id: string;               // CHAR(36) UUID
	user_id: string;          // CHAR(36)
	total_amount: number;     // DECIMAL(10,2)
	status?: OrderStatus;     // ENUM
	created_at?: string;      // TIMESTAMP
}