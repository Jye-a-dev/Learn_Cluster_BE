import { ChapterModel } from "../chapter/model.js";
export const ChapterService = {
    getAll(query) {
        return ChapterModel.getAll(query);
    },
    getById(id) {
        return ChapterModel.getById(id);
    },
    getByCourse(course_id) {
        return ChapterModel.getByCourse(course_id);
    },
    create(data) {
        return ChapterModel.create(data);
    },
    update(id, data) {
        return ChapterModel.update(id, data);
    },
    delete(id) {
        return ChapterModel.delete(id);
    },
    count(course_id) {
        return ChapterModel.count(course_id);
    },
};
