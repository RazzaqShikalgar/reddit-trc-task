// services/votes-service/src/db/entity.ts

import { votes } from '../../../../drizzle/schema.votes'; // Adjust the import based on your project structure
import { eq, and } from 'drizzle-orm';
import dotenv from 'dotenv';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';


dotenv.config({ path: ".env" });

const queryClient = postgres(process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/reddit");
const db = drizzle(queryClient);

export const createVote = async (authorId: string, postId: number, type: 'UP' | 'DOWN') => {
    const newVote = { authorId, postId, type };
    await db.insert(votes).values(newVote).execute();
};

export const findVotesByPostId = async (postId: number) => {
    return await db.select().from(votes).where(eq(votes.postId, postId)).execute();
};

export const deleteVote = async (authorId: string, postId: number) => {
    await db.delete(votes).where(and(eq(votes.authorId, authorId), eq(votes.postId, postId))).execute();
};
