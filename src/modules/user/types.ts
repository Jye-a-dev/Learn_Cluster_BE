export interface User {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  role_id?: string | number | null;
  google_id?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  [key: string]: any;
}