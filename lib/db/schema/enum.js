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