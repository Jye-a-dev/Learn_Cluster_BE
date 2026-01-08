// src/services/study_date_participant.service.ts
import type { StudyDateParticipant } from "../@types/study_date_participant.js";
import { StudyDateParticipantModel } from "../models/study_date_participant.model.js";

export const StudyDateParticipantService = {
	getByStudyDate: (study_date_id: number) => StudyDateParticipantModel.getByStudyDate(study_date_id),

	join: (study_date_id: number, user_id: string) => StudyDateParticipantModel.join(study_date_id, user_id),

	leave: (study_date_id: number, user_id: string) => StudyDateParticipantModel.leave(study_date_id, user_id),
	getAll: () => StudyDateParticipantModel.getAll(),
	countByStudyDate: (study_date_id: number) => StudyDateParticipantModel.countByStudyDate(study_date_id),
};
