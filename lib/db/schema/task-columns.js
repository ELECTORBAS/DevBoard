import { pgTable, uuid, varchar, real, timestamp, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { projects } from "./projects";
import { tasks } from "./tasks";

export const taskColumns = pgTable(
  "task_columns",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 100 }).notNull(),
    position: real("position").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    projectIdx: index("task_columns_project_id_idx").on(table.projectId),
    projectPositionIdx: index("task_columns_project_id_position_idx").on(
      table.projectId,
      table.position
    ),
  })
);

export const taskColumnsRelations = relations(taskColumns, ({ one, many }) => ({
  project: one(projects, {
    fields: [taskColumns.projectId],
    references: [projects.id],
  }),
  tasks: many(tasks),
}));