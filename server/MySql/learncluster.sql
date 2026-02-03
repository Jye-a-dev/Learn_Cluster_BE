-- =========================
-- DATABASE: learncluster
-- =========================
-- USERS & ROLES
CREATE TABLE
  roles (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID ()),
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
  ) ENGINE = InnoDB;

CREATE TABLE
  users (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID ()),
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role_id CHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE SET NULL
  ) ENGINE = InnoDB;

CREATE TABLE
  permissions (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID ()),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
  ) ENGINE = InnoDB;

CREATE TABLE
  role_permissions (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID ()),
    role_id CHAR(36) NOT NULL,
    permission_id CHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions (id) ON DELETE CASCADE
  ) ENGINE = InnoDB;

-- COURSES----------------------
CREATE TABLE
  courses (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID ()),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    objective TEXT,
    duration_hours INT,
    status ENUM ('draft', 'public', 'closed') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE = InnoDB;

CREATE TABLE
  course_instructors (
    id CHAR(36) NOT NULL DEFAULT (UUID ()),
    course_id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    role_in_course ENUM ('Teacher', 'TA', 'Moderator') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_course_user_role (course_id, user_id, role_in_course),
    FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  ) ENGINE = InnoDB;

CREATE TABLE
  enrollments (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID ()),
    user_id CHAR(36) NOT NULL,
    course_id CHAR(36) NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, course_id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE
  ) ENGINE = InnoDB;

-- CONTENT STRUCTURE---------------------------------------
CREATE TABLE
  chapters (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID ()),
    course_id CHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    ordering INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE
  ) ENGINE = InnoDB;

CREATE TABLE
  lessons (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID ()),
    chapter_id CHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content_type ENUM ('video', 'pdf', 'text') NOT NULL,
    content_url TEXT,
    content_text LONGTEXT NULL,
    ordering INT NOT NULL,
    FOREIGN KEY (chapter_id) REFERENCES chapters (id) ON DELETE CASCADE
  ) ENGINE = InnoDB;

-- ASSIGNMENTS & GRADES
CREATE TABLE
  assignments (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID ()),
    course_id CHAR(36) NOT NULL,
    title VARCHAR(255),
    description TEXT,
    file_url TEXT,
    deadline DATETIME,
    FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE
  ) ENGINE = InnoDB;

CREATE TABLE
  submissions (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID ()),
    assignment_id CHAR(36) NOT NULL,
    student_id CHAR(36) NOT NULL,
    file_url TEXT,
    text_submission TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (assignment_id) REFERENCES assignments (id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users (id) ON DELETE CASCADE
  ) ENGINE = InnoDB;

CREATE TABLE
  grades (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID ()),
    submission_id CHAR(36) NOT NULL UNIQUE,
    grader_id CHAR(36),
    score DECIMAL(5, 2),
    feedback TEXT,
    graded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (submission_id) REFERENCES submissions (id) ON DELETE CASCADE,
    FOREIGN KEY (grader_id) REFERENCES users (id) ON DELETE SET NULL
  ) ENGINE = InnoDB;

-- STUDY DATE
CREATE TABLE
  study_dates (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID ()),
    course_id CHAR(36) NOT NULL,
    title VARCHAR(255),
    scheduled_at DATETIME,
    location TEXT,
    created_by CHAR(36),
    FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE SET NULL
  ) ENGINE = InnoDB;

CREATE TABLE
  study_date_participants (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID ()),
    study_date_id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (study_date_id, user_id),
    FOREIGN KEY (study_date_id) REFERENCES study_dates (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  ) ENGINE = InnoDB;

CREATE TABLE
  study_date_lessons (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID ()),
    study_date_id CHAR(36) NOT NULL,
    lesson_id CHAR(36) NOT NULL,
    UNIQUE KEY uq_study_date_lesson (study_date_id, lesson_id),
    FOREIGN KEY (study_date_id) REFERENCES study_dates (id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons (id) ON DELETE CASCADE
  ) ENGINE = InnoDB;

-- INTERACTION
CREATE TABLE
  messages (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID ()),
    study_date_id CHAR(36) NOT NULL,
    sender_id CHAR(36),
    content TEXT,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (study_date_id) REFERENCES study_dates (id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users (id) ON DELETE SET NULL
  ) ENGINE = InnoDB;

CREATE TABLE
  notes (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID ()),
    user_id CHAR(36) NOT NULL,
    lesson_id CHAR(36) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, lesson_id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons (id) ON DELETE CASCADE
  ) ENGINE = InnoDB;

CREATE TABLE
  bookmarks (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID ()),
    user_id CHAR(36) NOT NULL,
    lesson_id CHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, lesson_id),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons (id) ON DELETE CASCADE
  ) ENGINE = InnoDB;

CREATE TABLE
  notifications (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID ()),
    user_id CHAR(36) NOT NULL,
    type VARCHAR(50),
    content TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  ) ENGINE = InnoDB;

CREATE TABLE
  achievements (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID ()),
    user_id CHAR(36) NOT NULL,
    name VARCHAR(100),
    description TEXT,
    awarded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  ) ENGINE = InnoDB;