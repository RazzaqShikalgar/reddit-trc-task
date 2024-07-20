// services/posts-service/src/services/postService.ts
import { createPost, getAllPosts, findPostById } from '../db/post-entity'; // Import DB functions
import { Post } from '../model/post'; // Import the Post interface

export class PostService {
    async createPost(authorId: string, title: string, content: any, subredditId: number): Promise<Post> {
        const newPost: Post = {
            id: 0, // This will be auto-generated
            title,
            content,
            createdAt: new Date(),
            updatedAt: new Date(),
            subredditId,
            authorId,
        };

        await createPost(newPost);
        return newPost; // Return the created post
    }

    async getAllPosts(): Promise<Post[]> {
        return await getAllPosts(); // Fetch all posts
    }
 async getPostById(postId: number): Promise<Post | null> {
        return await findPostById(postId); // Fetch post by ID
    }

}
