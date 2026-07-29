import { pgEnum } from "drizzle-orm/pg-core";

export const projectStatusEnum = pgEnum("project_status", ["ACTIVE", "ARCHIVED"]);
export const projectRoleEnum = pgEnum("project_role", ["OWNER", "ADMIN", "MEMBER", "VIEWER"]);

export const invitationStatusEnum = pgEnum("invitation_status", ["PENDING", "ACCEPTED", "DECLINED"]);

export const taskPriorityEnum = pgEnum("task_priority", ["LOW", "MEDIUM", "HIGH", "URGENT"]);

export const notificationTypeEnum = pgEnum("notification_type", [
  "TASK_ASSIGNED",
  "TASK_UNASSIGNED",
  "TASK_DUE_SOON",
  "MENTIONED_IN_COMMENT",
  "COMMENT_ON_ASSIGNED_TASK",
  "PROJECT_INVITED",
  "INVITATION_ACCEPTED",
  "INVITATION_DECLINED",
  "ROLE_CHANGED",
  "REMOVED_FROM_PROJECT",
]);

export const activityEntityTypeEnum = pgEnum("activity_entity_type", [
  "PROJECT",
  "MEMBER",
  "COLUMN",
  "TASK",
  "COMMENT",
  "ATTACHMENT",
]);

export const activityActionEnum = pgEnum("activity_action", [
  "PROJECT_CREATED",
  "PROJECT_UPDATED",
  "PROJECT_ARCHIVED",
  "PROJECT_RESTORED",
  "MEMBER_INVITED",
  "MEMBER_JOINED",
  "MEMBER_REMOVED",
  "MEMBER_ROLE_CHANGED",
  "OWNERSHIP_TRANSFERRED",
  "COLUMN_CREATED",
  "COLUMN_RENAMED",
  "COLUMN_REORDERED",
  "COLUMN_DELETED",
  "TASK_CREATED",
  "TASK_UPDATED",
  "TASK_MOVED",
  "TASK_ASSIGNED",
  "TASK_UNASSIGNED",
  "TASK_DUE_DATE_CHANGED",
  "TASK_DELETED",
  "COMMENT_ADDED",
  "COMMENT_EDITED",
  "COMMENT_DELETED",
  "ATTACHMENT_ADDED",
  "ATTACHMENT_REMOVED",
]);