// services/comments-service/src/model/comment.ts
export interface Comment {
    id?: number;              // Serial ID
    text: string;            // Comment text
    createdAt: Date | null;        // Creation timestamp
    replyToId?: number | null;     // Optional ID of the comment being replied to
    authorId: string;       // ID of the author (user)
    postId: number;         // ID of the associated post
}

export type NewComment = Omit<Comment, 'id' | 'createdAt'>; // Exclude 'id' and 'createdAt' for new comments
