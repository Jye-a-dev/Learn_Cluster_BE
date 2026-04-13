// src/services/services.ts
import { StudyDateParticipantModel } from "../studyDateParticipant/model.js";
export const StudyDateParticipantService = {
    getByStudyDate: (study_date_id) => StudyDateParticipantModel.getByStudyDate(study_date_id),
    join: (study_date_id, user_id) => StudyDateParticipantModel.join(study_date_id, user_id),
    leave: (study_date_id, user_id) => StudyDateParticipantModel.leave(study_date_id, user_id),
    getAll: () => StudyDateParticipantModel.getAll(),
    countByStudyDate: (study_date_id) => StudyDateParticipantModel.countByStudyDate(study_date_id),
    getByUser: (user_id) => StudyDateParticipantModel.getByUser(user_id),
    countByUser: (user_id) => StudyDateParticipantModel.countByUser(user_id),
    exists: (study_date_id, user_id) => StudyDateParticipantModel.exists(study_date_id, user_id),
    removeByStudyDateAndUser: (study_date_id, user_id) => StudyDateParticipantModel.removeByStudyDateAndUser(study_date_id, user_id),
};
