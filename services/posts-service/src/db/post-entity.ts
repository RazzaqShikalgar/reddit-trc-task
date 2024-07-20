// services/posts-service/src/db.entity.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import dotenv from 'dotenv';
import { posts } from '../../../../drizzle/index'; // Adjust the import based on your path
import { Post } from '../model/post'; // Adjust the import based on your path

dotenv.config({ path: ".env" });

const queryClient = postgres(process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/reddit");
const db = drizzle(queryClient);

// Function to create a new post
export const createPost = async (postData: Post): Promise<void> => {
    await db.insert(posts).values(postData).execute();
};

// Function to find a post by ID
export const findPostById = async (id: number): Promise<Post | null> => {
    const result = await db
        .select()
        .from(posts)
        .where(eq(posts.id, id))
        .execute();
    return result[0] || null; // Return the first matching post or null
};

// Function to get all posts
export const getAllPosts = async (): Promise<Post[]> => {
    const result = await db.select().from(posts).execute();
    return result; // Return the list of posts
};
