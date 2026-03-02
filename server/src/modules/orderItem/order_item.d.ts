export type OrderItemType = "course" | "plan";

export interface OrderItem {
	id: string;            // CHAR(36) UUID
	order_id: string;      // FK -> orders.id
	item_type: OrderItemType; // ENUM
	item_id: string;       // CHAR(36)
	price: number;         // DECIMAL(10,2)
}