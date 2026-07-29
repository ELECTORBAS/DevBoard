import { pgTable, uuid, varchar, text, real, date, timestamp, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { projects } from "./projects";
import { taskColumns } from "./task-columns";
import { users } from "./users";
import { taskPriorityEnum } from "./enums";

export const tasks = pgTable(
  "tasks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    columnId: uuid("column_id")
      .notNull()
      .references(() => taskColumns.id, { onDelete: "restrict" }),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    assigneeId: uuid("assignee_id").references(() => users.id, { onDelete: "set null" }),
    priority: taskPriorityEnum("priority").notNull().default("MEDIUM"),
    position: real("position").notNull(),
    dueDate: date("due_date"),
    startDate: date("start_date"),
    createdBy: uuid("created_by")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    projectIdx: index("tasks_project_id_idx").on(table.projectId),
    columnIdx: index("tasks_column_id_idx").on(table.columnId),
    columnPositionIdx: index("tasks_column_id_position_idx").on(
      table.columnId,
      table.position
    ),
    assigneeIdx: index("tasks_assignee_id_idx").on(table.assigneeId),
    priorityIdx: index("tasks_priority_idx").on(table.priority),
    dueDateIdx: index("tasks_due_date_idx").on(table.dueDate),
  })
);

export const tasksRelations = relations(tasks, ({ one }) => ({
  project: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),
  column: one(taskColumns, {
    fields: [tasks.columnId],
    references: [taskColumns.id],
  }),
  assignee: one(users, {
    fields: [tasks.assigneeId],
    references: [users.id],
  }),
  creator: one(users, {
    fields: [tasks.createdBy],
    references: [users.id],
  }),
}));