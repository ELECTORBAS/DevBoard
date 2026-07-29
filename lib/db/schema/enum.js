import { pgEnum } from "drizzle-orm/pg-core";

export const projectStatusEnum = pgEnum("project_status", ["ACTIVE", "ARCHIVED"]);
export const projectRoleEnum = pgEnum("project_role", ["OWNER", "ADMIN", "MEMBER", "VIEWER"]);

export const invitationStatusEnum = pgEnum("invitation_status", ["PENDING", "ACCEPTED", "DECLINED"]);

export const taskPriorityEnum = pgEnum("task_priority", ["LOW", "MEDIUM", "HIGH", "URGENT"]);