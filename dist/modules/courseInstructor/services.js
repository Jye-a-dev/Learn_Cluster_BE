import { CourseInstructorModel } from "../courseInstructor/model.js";
export const CourseInstructorService = {
    // ===== GET ALL =====
    getAll: () => CourseInstructorModel.getAll(),
    // ===== GET BY ID =====
    getById: (id) => CourseInstructorModel.getById(id),
    // ===== GET BY COURSE =====
    getByCourse: (course_id) => CourseInstructorModel.getByCourse(course_id),
    // ===== GET BY USER =====
    getByUser: (user_id) => CourseInstructorModel.getByUser(user_id),
    // ===== CREATE =====
    create: (data) => CourseInstructorModel.create(data),
    // ===== UPDATE ROLE =====
    updateRole: (id, role_in_course) => CourseInstructorModel.updateRole(id, role_in_course),
    // ===== DELETE =====
    delete: (id) => CourseInstructorModel.delete(id),
    // ===== DELETE ALL BY COURSE =====
    deleteByCourse: (course_id) => CourseInstructorModel.deleteByCourse(course_id),
    // ===== COUNT BY COURSE =====
    countByCourse: (course_id) => CourseInstructorModel.countByCourse(course_id),
    // ===== FULL INFO =====
    getFullByCourse: (course_id) => CourseInstructorModel.getFullByCourse(course_id),
};
