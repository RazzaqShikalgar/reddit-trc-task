// services/comments-service/src/db.entity.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import dotenv from 'dotenv';
import { comments } from '../../../../drizzle/index'; // Adjust the import based on your path
import { Comment, NewComment } from '../models/comment'; // Adjust the import based on your path

dotenv.config({ path: ".env" });

const queryClient = postgres(process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/reddit");
const db = drizzle(queryClient);

// Function to create a new comment
export const createComment = async (commentData: NewComment): Promise<void> => {
    await db.insert(comments).values(commentData).execute();
};

// Function to find a comment by ID
export const findCommentById = async (id: number): Promise<Comment | null> => {
    const result = await db
        .select()
        .from(comments)
        .where(eq(comments.id, id)) // Use eq() for comparison
        .execute();
    return result[0] || null; // Return the first matching comment or null
};

// Function to get all comments for a post
export const getCommentsByPostId = async (postId: number): Promise<Comment[]> => {
    const result = await db
        .select()
        .from(comments)
        .where(eq(comments.postId, postId)) // Use eq() for comparison
        .execute();
    return result as Comment[]; // Cast the result to Comment[]
};
