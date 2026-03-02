export interface Permission {
    id: string; // INT AUTO_INCREMENT
    name: string; // VARCHAR(100) UNIQUE NOT NULL
    description?: string | null; // TEXT, có thể null
}