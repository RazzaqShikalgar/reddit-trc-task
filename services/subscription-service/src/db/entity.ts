// services/subscriptions-service/src/db/entity.ts

import postgres from 'postgres';
import { subscriptions } from '../../../../drizzle/schema.subscription'; // Adjust the import based on your project structure
import { eq, and } from 'drizzle-orm';
import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';

dotenv.config({ path: ".env" });

const queryClient = postgres(process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/reddit");
const db = drizzle(queryClient);

export const createSubscription = async (userId: string, subredditId: number) => {
    const newSubscription = { userId, subredditId };
    await db.insert(subscriptions).values(newSubscription).execute();
};

export const findSubscriptionsByUserId = async (userId: string) => {
    return await db.select().from(subscriptions).where(eq(subscriptions.userId, userId)).execute();
};

export const deleteSubscription = async (userId: string, subredditId: number) => {
    await db.delete(subscriptions).where(and(eq(subscriptions.userId, userId), eq(subscriptions.subredditId, subredditId))).execute();
};
