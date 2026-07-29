import { pgTable, uuid, timestamp, uniqueIndex, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { taskComments } from "./comments";
import { users } from "./auth";

export const commentMentions = pgTable(
  "comment_mentions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    commentId: uuid("comment_id")
      .notNull()
      .references(() => taskComments.id, { onDelete: "cascade" }),
    mentionedUserId: uuid("mentioned_user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    commentUserUnique: uniqueIndex("comment_mentions_comment_id_user_id_idx").on(
      table.commentId,
      table.mentionedUserId
    ),
    mentionedUserIdx: index("comment_mentions_mentioned_user_id_idx").on(table.mentionedUserId),
  })
);

export const commentMentionsRelations = relations(commentMentions, ({ one }) => ({
  comment: one(taskComments, {
    fields: [commentMentions.commentId],
    references: [taskComments.id],
  }),
  mentionedUser: one(users, {
    fields: [commentMentions.mentionedUserId],
    references: [users.id],
  }),
}));