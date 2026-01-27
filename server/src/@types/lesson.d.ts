export interface Lesson {
    id: string; // INT AUTO_INCREMENT
    chapter_id: number; // INT NOT NULL, FK chapters.id
    title: string; // VARCHAR(255) NOT NULL
    content_type: 'video' | 'pdf' | 'text'; // ENUM('video','pdf','text')
    content_url?: string | null; // TEXT, có thể null
    ordering: number; // INT NOT NULL
}