// services/votes-service/src/services/voteService.ts

import { createVote, findVotesByPostId, deleteVote } from '../db/entity';

export class VoteService {
    async create(authorId: string, postId: number, type: 'UP' | 'DOWN') {
        await createVote(authorId, postId, type);
    }

    async getByPostId(postId: number) {
        return await findVotesByPostId(postId);
    }

    async remove(authorId: string, postId: number) {
        await deleteVote(authorId, postId);
    }
}
