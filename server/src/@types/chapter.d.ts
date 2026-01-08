export interface Chapter {
    id: number; // INT AUTO_INCREMENT
    course_id: number; // INT NOT NULL, FK courses.id
    title: string; // VARCHAR(255) NOT NULL
    ordering: number; // INT NOT NULL
}