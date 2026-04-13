import achievementRoutes from "../modules/achievement/routes.js";
import assignmentRoutes from "../modules/assigment/routes.js";
import authRoutes from "../modules/auth/routes.js";
import bookmarkRoutes from "../modules/bookmark/routes.js";
import chapterRoutes from "../modules/chapter/routes.js";
import configRoutes from "../modules/config/routes.js";
import courseRoutes from "../modules/course/routes.js";
import courseInstructorRoutes from "../modules/courseInstructor/routes.js";
import enrollmentRoutes from "../modules/enrollment/routes.js";
import gradeRoutes from "../modules/grade/routes.js";
import lessonRoutes from "../modules/lesson/routes.js";
import messageRoutes from "../modules/message/routes.js";
import noteRoutes from "../modules/note/routes.js";
import notificationRoutes from "../modules/notification/routes.js";
import orderRoutes from "../modules/order/routes.js";
import orderItemRoutes from "../modules/orderItem/routes.js";
import paymentRoutes from "../modules/payment/routes.js";
import planRoutes from "../modules/plan/routes.js";
import roleRoutes from "../modules/role/routes.js";
import studyDateRoutes from "../modules/studyDate/routes.js";
import studyDateLessonRoutes from "../modules/studyDateLesson/routes.js";
import studyDateParticipantRoutes from "../modules/studyDateParticipant/routes.js";
import studyMatchRoutes from "../modules/studyMatch/routes.js";
import studyProfileRoutes from "../modules/studyProfile/routes.js";
import studySwipeRoutes from "../modules/studySwipe/routes.js";
import submissionRoutes from "../modules/submission/routes.js";
import userRoutes from "../modules/user/routes.js";
export const routeList = [
    { name: "achievement", router: achievementRoutes, layer: "intelligence", description: "Learner milestones and skill unlock signals." },
    { name: "assignment", router: assignmentRoutes, layer: "learning", description: "Tasks, deadlines and assessment inputs for the LMS layer." },
    { name: "auth", router: authRoutes, layer: "platform", description: "Authentication, session management and identity entry points." },
    { name: "bookmark", router: bookmarkRoutes, layer: "intelligence", description: "Learner preference signals captured from saved learning items." },
    { name: "chapter", router: chapterRoutes, layer: "learning", description: "Course structure building blocks for the learning foundation." },
    { name: "config", router: configRoutes, layer: "platform", description: "Public runtime configuration that frontend clients can safely read from the backend." },
    { name: "course", router: courseRoutes, layer: "learning", description: "Primary course catalog and roadmap-ready learning containers." },
    { name: "course_instructor", router: courseInstructorRoutes, layer: "learning", description: "Teacher, TA and moderator relationships inside courses." },
    { name: "enrollment", router: enrollmentRoutes, layer: "learning", description: "Learner participation in courses and cohorts." },
    { name: "grade", router: gradeRoutes, layer: "learning", description: "Scoring, feedback and evaluation outputs for learning tasks." },
    { name: "lesson", router: lessonRoutes, layer: "learning", description: "Atomic learning units that feed roadmap progression." },
    { name: "message", router: messageRoutes, layer: "social", description: "Conversation layer for study dates and collaborative learning." },
    { name: "note", router: noteRoutes, layer: "intelligence", description: "Personal knowledge traces captured while learning." },
    { name: "notification", router: notificationRoutes, layer: "social", description: "Engagement and coordination signals across the ecosystem." },
    { name: "order", router: orderRoutes, layer: "platform", description: "Commercial order lifecycle for paid learning experiences." },
    { name: "order_item", router: orderItemRoutes, layer: "platform", description: "Line items attached to commercial order flows." },
    { name: "payment", router: paymentRoutes, layer: "platform", description: "Payment records supporting transactional platform operations." },
    { name: "plan", router: planRoutes, layer: "intelligence", description: "Roadmap-oriented planning resources for guided learning paths." },
    { name: "role", router: roleRoutes, layer: "platform", description: "Role definitions for admins, teachers and learners." },
    { name: "study_date", router: studyDateRoutes, layer: "social", description: "Scheduled collaborative learning sessions and study events." },
    { name: "study_date_lesson", router: studyDateLessonRoutes, layer: "social", description: "Lesson-to-study-date linkage for contextual social learning." },
    { name: "study_date_participant", router: studyDateParticipantRoutes, layer: "social", description: "Participants who join collaborative study sessions." },
    { name: "study_match", router: studyMatchRoutes, layer: "social", description: "Confirmed connections between learners for paired or group study." },
    { name: "study_profile", router: studyProfileRoutes, layer: "social", description: "Learner intent and profile data used for matching." },
    { name: "study_swipe", router: studySwipeRoutes, layer: "social", description: "Candidate matching interactions before a study match is formed." },
    { name: "submission", router: submissionRoutes, layer: "learning", description: "Learner outputs submitted for review and grading." },
    { name: "user", router: userRoutes, layer: "platform", description: "Core user identities and platform-level learner records." },
];
export function extractRoutes(router, prefix) {
    const routes = [];
    const stack = router.stack ?? [];
    for (const layer of stack) {
        if (!layer.route)
            continue;
        const methods = Object.keys(layer.route.methods).map((method) => method.toUpperCase());
        routes.push({
            methods,
            path: prefix + layer.route.path,
        });
    }
    return routes;
}
