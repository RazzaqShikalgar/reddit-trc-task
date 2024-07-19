// services/posts-service/src/model/post.ts
export interface Post {
    id: number;              // Serial ID
    title: string;          // Post title
    content: any;           // Post content (JSON)
    createdAt: Date | null;        // Creation timestamp
    updatedAt: Date | null;        // Update timestamp
    subredditId: number;    // ID of the associated subreddit
    authorId: string;       // ID of the author (user)
}
