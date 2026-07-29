import { pgTable, uuid, varchar, integer, timestamp, check, index } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { projects } from "./projects";
import { tasks } from "./tasks";
import { users } from "./auth";

export const attachments = pgTable(
  "attachments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id").references(() => projects.id, { onDelete: "cascade" }),
    taskId: uuid("task_id").references(() => tasks.id, { onDelete: "cascade" }),
    uploadedBy: uuid("uploaded_by")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    fileName: varchar("file_name", { length: 255 }).notNull(),
    fileUrl: varchar("file_url", { length: 2048 }).notNull(),
    fileType: varchar("file_type", { length: 127 }).notNull(),
    fileSize: integer("file_size").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    exactlyOneParent: check(
      "attachments_exactly_one_parent",
      sql`(${table.projectId} IS NOT NULL AND ${table.taskId} IS NULL) OR (${table.projectId} IS NULL AND ${table.taskId} IS NOT NULL)`
    ),
    projectIdx: index("attachments_project_id_idx").on(table.projectId),
    taskIdx: index("attachments_task_id_idx").on(table.taskId),
    uploadedByIdx: index("attachments_uploaded_by_idx").on(table.uploadedBy),
  })
);

export const attachmentsRelations = relations(attachments, ({ one }) => ({
  project: one(projects, {
    fields: [attachments.projectId],
    references: [projects.id],
  }),
  task: one(tasks, {
    fields: [attachments.taskId],
    references: [tasks.id],
  }),
  uploader: one(users, {
    fields: [attachments.uploadedBy],
    references: [users.id],
  }),
}));