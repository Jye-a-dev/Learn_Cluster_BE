import { RolePermissionModel } from "../rolePermisson/model.js";
export const RolePermissionService = {
    /* ---------- GET ---------- */
    getAll() {
        return RolePermissionModel.getAll();
    },
    getById(id) {
        return RolePermissionModel.getById(id);
    },
    getByRoleId(role_id) {
        return RolePermissionModel.getByRoleId(role_id);
    },
    getByPermissionId(permission_id) {
        return RolePermissionModel.getByPermissionId(permission_id);
    },
    /* ---------- CREATE ---------- */
    add(role_id, permission_id) {
        return RolePermissionModel.add(role_id, permission_id);
    },
    /* ---------- DELETE ---------- */
    removeById(id) {
        return RolePermissionModel.removeById(id);
    },
    remove(role_id, permission_id) {
        return RolePermissionModel.remove(role_id, permission_id);
    },
    removeByRole(role_id) {
        return RolePermissionModel.removeByRole(role_id);
    },
    removeByPermission(permission_id) {
        return RolePermissionModel.removeByPermission(permission_id);
    },
    /* ---------- COUNT ---------- */
    countByRole(role_id) {
        return RolePermissionModel.countByRole(role_id);
    },
    countByPermission(permission_id) {
        return RolePermissionModel.countByPermission(permission_id);
    },
    putById(id, data) {
        return RolePermissionModel.updateById(id, data);
    },
    /* PATCH = update từng phần */
    patchById(id, data) {
        return RolePermissionModel.updateById(id, data);
    },
};
