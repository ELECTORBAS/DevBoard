import { pgTable, uuid, jsonb, timestamp, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { projects } from "./projects";
import { users } from "./auth";
import { activityActionEnum, activityEntityTypeEnum } from "./enum";

export const activityLogs = pgTable(
  "activity_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    action: activityActionEnum("action").notNull(),
    entityType: activityEntityTypeEnum("entity_type").notNull(),
    entityId: uuid("entity_id").notNull(),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    projectIdx: index("activity_logs_project_id_idx").on(table.projectId),
    projectCreatedAtIdx: index("activity_logs_project_id_created_at_idx").on(
      table.projectId,
      table.createdAt
    ),
    userIdx: index("activity_logs_user_id_idx").on(table.userId),
    entityIdx: index("activity_logs_entity_type_entity_id_idx").on(
      table.entityType,
      table.entityId
    ),
  })
);

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  project: one(projects, {
    fields: [activityLogs.projectId],
    references: [projects.id],
  }),
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));