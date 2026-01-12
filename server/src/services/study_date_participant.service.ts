// src/services/study_date_participant.service.ts
import { StudyDateParticipantModel } from "../models/study_date_participant.model.js";

export const StudyDateParticipantService = {
	getByStudyDate: (study_date_id: number) => StudyDateParticipantModel.getByStudyDate(study_date_id),

	join: (study_date_id: number, user_id: string) => StudyDateParticipantModel.join(study_date_id, user_id),

	leave: (study_date_id: number, user_id: string) => StudyDateParticipantModel.leave(study_date_id, user_id),

	getAll: () => StudyDateParticipantModel.getAll(),
	
	countByStudyDate: (study_date_id: number) => StudyDateParticipantModel.countByStudyDate(study_date_id),

	getByUser: (user_id: string) => StudyDateParticipantModel.getByUser(user_id),

	countByUser: (user_id: string) => StudyDateParticipantModel.countByUser(user_id),

	exists: (study_date_id: number, user_id: string) => StudyDateParticipantModel.exists(study_date_id, user_id),

	removeByStudyDateAndUser: (study_date_id: number, user_id: string) => StudyDateParticipantModel.removeByStudyDateAndUser(study_date_id, user_id),
};
