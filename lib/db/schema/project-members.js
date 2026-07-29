import { pgTable, uuid, timestamp, index, uniqueIndex } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { projects } from "./projects";
import { users } from "./users";
import { projectRoleEnum } from "./enums";

export const projectMembers = pgTable(
  "project_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: projectRoleEnum("role").notNull().default("VIEWER"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    projectUserUnique: uniqueIndex("project_members_project_id_user_id_idx").on(
      table.projectId,
      table.userId
    ),
    // Enforces exactly one OWNER per project at the DB level
    oneOwnerPerProject: uniqueIndex("project_members_one_owner_idx")
      .on(table.projectId)
      .where(sql`${table.role} = 'OWNER'`),
    userIdx: index("project_members_user_id_idx").on(table.userId),
  })
);

export const projectMembersRelations = relations(projectMembers, ({ one }) => ({
  project: one(projects, {
    fields: [projectMembers.projectId],
    references: [projects.id],
  }),
  user: one(users, {
    fields: [projectMembers.userId],
    references: [users.id],
  }),
}));