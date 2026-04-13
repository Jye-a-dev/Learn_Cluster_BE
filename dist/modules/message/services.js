import { MessageModel } from "../message/model.js";
export const MessageService = {
    getByStudyDate: (study_date_id) => MessageModel.getByStudyDate(study_date_id),
    getById: (id) => MessageModel.getById(id),
    getAll: () => MessageModel.getAll(),
    getBySender: (sender_id) => MessageModel.getBySender(sender_id),
    create: (data) => MessageModel.create(data),
    delete: (id) => MessageModel.delete(id),
    update: (id, data) => MessageModel.update(id, data),
    count: () => MessageModel.count(),
};
