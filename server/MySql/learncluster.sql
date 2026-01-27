-- 1. Tạo database
CREATE DATABASE IF NOT EXISTS learncluster;

USE learncluster;

-- ==========================
-- Roles & Permissions
-- ==========================
CREATE TABLE
    roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        description TEXT
    );

CREATE TABLE
    permissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        description TEXT
    );

CREATE TABLE role_permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY uq_role_permission (role_id, permission_id),

    FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions (id) ON DELETE CASCADE
);
-- ==========================
-- Users
-- ==========================
CREATE TABLE
    users (
        id CHAR(36) PRIMARY KEY DEFAULT (UUID ()),
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE SET NULL
    );

-- ==========================
-- Courses, Chapters, Lessons
-- ==========================
CREATE TABLE
    courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        objective TEXT,
        duration_hours INT,
        status ENUM ('draft', 'public', 'closed') DEFAULT 'draft',
        teacher_id CHAR(36),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (teacher_id) REFERENCES users (id) ON DELETE SET NULL
    );

CREATE TABLE
    chapters (
        id INT AUTO_INCREMENT PRIMARY KEY,
        course_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        ordering INT NOT NULL,
        FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE
    );

CREATE TABLE
    lessons (
        id INT AUTO_INCREMENT PRIMARY KEY,
        chapter_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        content_type ENUM ('video', 'pdf', 'text') NOT NULL,
        content_url TEXT,
        ordering INT NOT NULL,
        FOREIGN KEY (chapter_id) REFERENCES chapters (id) ON DELETE CASCADE
    );

-- ==========================
-- Enrollment
-- ==========================
CREATE TABLE
    enrollments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id CHAR(36) NOT NULL,
        course_id INT NOT NULL,
        enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (user_id, course_id),
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE
    );

-- ==========================
-- Assignments & Grades
-- ==========================
CREATE TABLE
    assignments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        course_id INT NOT NULL,
        title VARCHAR(255),
        description TEXT,
        file_url TEXT,
        deadline DATETIME,
        FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE
    );

CREATE TABLE
    submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        assignment_id INT NOT NULL,
        student_id CHAR(36) NOT NULL,
        file_url TEXT,
        text_submission TEXT,
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (assignment_id) REFERENCES assignments (id) ON DELETE CASCADE,
        FOREIGN KEY (student_id) REFERENCES users (id) ON DELETE CASCADE
    );

CREATE TABLE
    grades (
        id INT AUTO_INCREMENT PRIMARY KEY,
        submission_id INT NOT NULL,
        grader_id CHAR(36),
        score DECIMAL(5, 2),
        feedback TEXT,
        graded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (submission_id) REFERENCES submissions (id) ON DELETE CASCADE,
        FOREIGN KEY (grader_id) REFERENCES users (id) ON DELETE SET NULL
    );

-- ==========================
-- Study Dates & Participants
-- ==========================
CREATE TABLE
    study_dates (
        id INT AUTO_INCREMENT PRIMARY KEY,
        course_id INT NOT NULL,
        title VARCHAR(255),
        lesson_ids JSON,
        scheduled_at DATETIME,
        location TEXT,
        created_by CHAR(36),
        FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE,
        FOREIGN KEY (created_by) REFERENCES users (id)
    );

CREATE TABLE
    study_date_participants (
        id INT AUTO_INCREMENT PRIMARY KEY,
        study_date_id INT NOT NULL,
        user_id CHAR(36) NOT NULL,
        joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (study_date_id, user_id),
        FOREIGN KEY (study_date_id) REFERENCES study_dates (id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );

-- ==========================
-- Messages & Notifications
-- ==========================
CREATE TABLE
    messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        study_date_id INT NOT NULL,
        sender_id CHAR(36),
        content TEXT,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (study_date_id) REFERENCES study_dates (id) ON DELETE CASCADE,
        FOREIGN KEY (sender_id) REFERENCES users (id) ON DELETE SET NULL
    );

CREATE TABLE
    notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id CHAR(36) NOT NULL,
        type VARCHAR(50),
        content TEXT,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );

-- ==========================
-- Notes, Bookmarks, Achievements
-- ==========================
CREATE TABLE
    notes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id CHAR(36) NOT NULL,
        lesson_id INT NOT NULL,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (lesson_id) REFERENCES lessons (id) ON DELETE CASCADE
    );

CREATE TABLE
    bookmarks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id CHAR(36) NOT NULL,
        lesson_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (lesson_id) REFERENCES lessons (id) ON DELETE CASCADE
    );

CREATE TABLE
    achievements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id CHAR(36) NOT NULL,
        name VARCHAR(100),
        description TEXT,
        awarded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );