import { pgTable, uuid, text, boolean, timestamp, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { tasks } from "./tasks";
import { users } from "./auth";
import { commentMentions } from "./comment-mentions";

export const taskComments = pgTable(
  "task_comments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    taskId: uuid("task_id")
      .notNull()
      .references(() => tasks.id, { onDelete: "cascade" }),
    authorId: uuid("author_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    parentId: uuid("parent_id").references(() => taskComments.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    isEdited: boolean("is_edited").notNull().default(false),
    isDeleted: boolean("is_deleted").notNull().default(false),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    taskIdx: index("task_comments_task_id_idx").on(table.taskId),
    parentIdx: index("task_comments_parent_id_idx").on(table.parentId),
    authorIdx: index("task_comments_author_id_idx").on(table.authorId),
  })
);

export const taskCommentsRelations = relations(taskComments, ({ one, many }) => ({
  task: one(tasks, {
    fields: [taskComments.taskId],
    references: [tasks.id],
  }),
  author: one(users, {
    fields: [taskComments.authorId],
    references: [users.id],
  }),
  parent: one(taskComments, {
    fields: [taskComments.parentId],
    references: [taskComments.id],
    relationName: "replies",
  }),
  replies: many(taskComments, { relationName: "replies" }),
  mentions: many(commentMentions),
}));