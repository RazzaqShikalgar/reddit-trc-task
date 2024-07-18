import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const User = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email').notNull().unique(),
  password: varchar('password').notNull(),
  googleId: varchar('googleId').nullable(),
});