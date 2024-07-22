// services/votes-service/src/models/vote.ts

export interface votes {
    type: 'UP' | 'DOWN';
    authorId: string;
    postId: number;
}

export interface NewVote {
    type: 'UP' | 'DOWN';
    authorId: string;
    postId: number;
}
