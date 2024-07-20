// import { pgTable, uuid, varchar, timestamp, integer } from 'drizzle-orm/pg-core';
// import { relations } from 'drizzle-orm';
// import userSchema from './schema.users';

// export const sessionSchema = pgTable('sessions', {
//     id: uuid('id').primaryKey(),
//     sessionToken: varchar('sessionToken', { length: 255 }).unique().notNull(),
//     userId: uuid('userId').notNull().references(() => userSchema.id, { onDelete: 'cascade' }),
//     expires: timestamp('expires').notNull(),
// });

// export const sessionRelations = relations(sessionSchema, ({ one }) => ({
//     user: one(userSchema, {
//         fields: [sessionSchema.userId],
//         references: [userSchema.id],
//     }),
// }));

// export default sessionSchema;