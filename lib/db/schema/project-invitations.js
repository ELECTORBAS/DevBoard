import { pgTable, uuid, varchar, timestamp, check, index, uniqueIndex } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { projects } from "./projects";
import { users } from "./users";
import { invitationStatusEnum } from "./enums";

export const projectInvitations = pgTable(
  "project_invitations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    invitedUserId: uuid("invited_user_id").references(() => users.id, { onDelete: "cascade" }),
    invitedEmail: varchar("invited_email", { length: 255 }),
    invitedBy: uuid("invited_by")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    status: invitationStatusEnum("status").notNull().default("PENDING"),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    exactlyOneTarget: check(
      "project_invitations_exactly_one_target",
      sql`(${table.invitedUserId} IS NOT NULL AND ${table.invitedEmail} IS NULL) OR (${table.invitedUserId} IS NULL AND ${table.invitedEmail} IS NOT NULL)`
    ),
    projectIdx: index("project_invitations_project_id_idx").on(table.projectId),
    pendingByUserUnique: uniqueIndex("project_invitations_pending_user_idx")
      .on(table.projectId, table.invitedUserId)
      .where(sql`${table.status} = 'PENDING' AND ${table.invitedUserId} IS NOT NULL`),
    pendingByEmailUnique: uniqueIndex("project_invitations_pending_email_idx")
      .on(table.projectId, table.invitedEmail)
      .where(sql`${table.status} = 'PENDING' AND ${table.invitedEmail} IS NOT NULL`),
  })
);

export const projectInvitationsRelations = relations(projectInvitations, ({ one }) => ({
  project: one(projects, {
    fields: [projectInvitations.projectId],
    references: [projects.id],
  }),
  invitedUser: one(users, {
    fields: [projectInvitations.invitedUserId],
    references: [users.id],
  }),
  inviter: one(users, {
    fields: [projectInvitations.invitedBy],
    references: [users.id],
  }),
}));