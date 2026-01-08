import type { Permission } from "../@types/permission.js";
import { PermissionModel } from "../models/permission.model.js";

export const PermissionService = {
  getAll: () => PermissionModel.getAll(),
  getById: (id: number) => PermissionModel.getById(id),
  create: (permission: Partial<Permission>) => PermissionModel.create(permission),
  update: (id: number, data: Partial<Permission>) => PermissionModel.update(id, data),
  delete: (id: number) => PermissionModel.delete(id),
  count: () => PermissionModel.count(),
};
