// services/comments-service/src/services/commentService.ts
import { createComment as dbCreateComment, getCommentsByPostId } from '../db/entity'; // Import DB functions
import { Comment, NewComment } from '../models/comment'; // Import the Comment interface

export class CommentService {
    async createComment(authorId: string, text: string, postId: number, replyToId?: number): Promise<Comment> {
        const newComment: NewComment = {
            text,
            postId,
            authorId,
            replyToId,
        };

        await dbCreateComment(newComment); // Call the DB function
        return {
            text,
            createdAt: new Date(),
            authorId,
            postId,
            replyToId,
        };
    }

    async getCommentsByPostId(postId: number): Promise<Comment[]> {
        return await getCommentsByPostId(postId); // Fetch comments for a specific post
    }
}
