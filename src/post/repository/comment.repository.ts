import { BadRequestException } from "@nestjs/common";
import { FriendsEntity } from "src/friends/entity/friends.entity";
import { EntityRepository, Repository } from "typeorm";
import { CommentEntity } from "../entity/comment.entity";
import { PostEntity } from "../entity/post.entity";

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity>{
    
    getComment(friend: FriendsEntity, comments: CommentEntity, user:string){
        if (!friend && comments.user_id!==user){
            throw new BadRequestException('Cannot access this comment')
        }
        const {comment} = comments
        return {comment}
    }

    commentValidation(comments:CommentEntity,postId:string){
        if(comments.post_id!==postId){
            throw new BadRequestException('Incorrect post ID')
        }
    }

    commentFilter(userId:string,post:PostEntity,friend: FriendsEntity){
        if(userId!==post.user && !friend){
            throw new BadRequestException('You cannot comment on this post')
        }
    }

    deleteComment(comment:CommentEntity){
        if (!comment){
            throw new BadRequestException('Cannot access this comment')
        } 
    }
}