export type PaymentStatus = "pending" | "success" | "failed";

export interface Payment {
	id: string;                // CHAR(36)
	order_id: string;          // FK -> orders.id
	provider?: string | null;  // momo | stripe | vnpay
	transaction_code?: string | null;
	amount?: number | null;    // DECIMAL(10,2)
	status?: PaymentStatus;    // ENUM
	paid_at?: string | null;   // DATETIME
	raw_response?: any;        // JSON
}