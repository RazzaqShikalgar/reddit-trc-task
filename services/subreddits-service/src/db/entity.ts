// services/subreddits-service/src/db.entity.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import dotenv from 'dotenv';
import { subreddits } from '../../../../drizzle/index'; // Adjust the import based on your path
import { Subreddit } from '../model/subreddit'; // Adjust the import based on your path

dotenv.config({ path: ".env" });

const queryClient = postgres(process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/reddit");
const db = drizzle(queryClient);
//TODO errors
// Function to create a new subreddit
export const createSubreddit = async (subredditData: Subreddit): Promise<void> => {
    await db.insert(subreddits).values(subredditData).execute();
};

// Function to find a subreddit by ID
export const findSubredditById = async (id: number): Promise<Subreddit | null> => {
    const result = await db
        .select()
        .from(subreddits)
        .where(eq(subreddits.id, id))
        .execute();
    return result[0] || null; // Return the first matching subreddit or null
};

// Function to get all subreddits
export const getAllSubreddits = async (): Promise<Subreddit[]> => {
    const result = await db.select().from(subreddits).execute();
    return result; // Return the list of subreddits
};
