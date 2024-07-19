import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { commentVotes } from './schema.commentVotes'
import { posts } from './schema.posts'
import { subreddits } from './schema.subreddits'
import { subscriptions } from './schema.subscription'
import { votes } from './schema.votes'

export const users = pgTable('user', {
    id: text('id').notNull().primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    emailVerified: timestamp('emailVerified', { mode: 'date' }),
    image: text('image'),
    password: text('password'),
    username: text('username').unique().notNull()
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export const usersRelations = relations(users, ({ many }) => ({
    createdSubreddits: many(subreddits, {
        relationName: 'CreatedBy'
    }),

    posts: many(posts),

    votes: many(votes),

    commentVotes: many(commentVotes),

    subscriptions: many(subscriptions)
}))