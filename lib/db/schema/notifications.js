import { pgTable, uuid, boolean, timestamp, check, index } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { users } from "./auth";
import { projects } from "./projects";
import { tasks } from "./tasks";
import { taskComments } from "./comments";
import { projectInvitations } from "./project-invitations";
import { notificationTypeEnum } from "./enum";

export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    recipientId: uuid("recipient_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    actorId: uuid("actor_id").references(() => users.id, { onDelete: "set null" }),
    type: notificationTypeEnum("type").notNull(),
    projectId: uuid("project_id").references(() => projects.id, { onDelete: "cascade" }),
    taskId: uuid("task_id").references(() => tasks.id, { onDelete: "cascade" }),
    commentId: uuid("comment_id").references(() => taskComments.id, { onDelete: "cascade" }),
    invitationId: uuid("invitation_id").references(() => projectInvitations.id, { onDelete: "cascade" }),
    isRead: boolean("is_read").notNull().default(false),
    readAt: timestamp("read_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    exactlyOneTarget: check(
      "notifications_exactly_one_target",
      sql`(
        (CASE WHEN ${table.projectId} IS NOT NULL THEN 1 ELSE 0 END) +
        (CASE WHEN ${table.taskId} IS NOT NULL THEN 1 ELSE 0 END) +
        (CASE WHEN ${table.commentId} IS NOT NULL THEN 1 ELSE 0 END) +
        (CASE WHEN ${table.invitationId} IS NOT NULL THEN 1 ELSE 0 END)
      ) = 1`
    ),
    readStateConsistency: check(
      "notifications_read_state_consistency",
      sql`(${table.isRead} = false AND ${table.readAt} IS NULL) OR (${table.isRead} = true AND ${table.readAt} IS NOT NULL)`
    ),
    recipientIdx: index("notifications_recipient_id_idx").on(table.recipientId),
    recipientUnreadIdx: index("notifications_recipient_unread_idx")
      .on(table.recipientId, table.isRead),
    createdAtIdx: index("notifications_created_at_idx").on(table.createdAt),
  })
);

export const notificationsRelations = relations(notifications, ({ one }) => ({
  recipient: one(users, {
    fields: [notifications.recipientId],
    references: [users.id],
  }),
  actor: one(users, {
    fields: [notifications.actorId],
    references: [users.id],
  }),
  project: one(projects, {
    fields: [notifications.projectId],
    references: [projects.id],
  }),
  task: one(tasks, {
    fields: [notifications.taskId],
    references: [tasks.id],
  }),
  comment: one(taskComments, {
    fields: [notifications.commentId],
    references: [taskComments.id],
  }),
  invitation: one(projectInvitations, {
    fields: [notifications.invitationId],
    references: [projectInvitations.id],
  }),
}));