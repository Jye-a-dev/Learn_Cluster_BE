export interface Plan {
	id: string;               // CHAR(36) UUID
	name: string;             // VARCHAR(100)
	description?: string | null;
	price: number;            // DECIMAL(10,2)
	duration_days?: number | null;
	is_active?: boolean;      // BOOLEAN
	created_at?: string;      // TIMESTAMP
}