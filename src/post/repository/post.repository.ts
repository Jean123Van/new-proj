import { BadRequestException } from "@nestjs/common";
import { FriendsEntity } from "src/friends/entity/friends.entity";
import { EntityRepository, Repository } from "typeorm";
import { PostEntity } from "../entity/post.entity";

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity>{

    getPost(post: PostEntity,friend:FriendsEntity,userId:string){
        if(!post){
            throw new BadRequestException('Post does not exist')
        }
        if(!friend && post.user!==userId){
            throw new BadRequestException('You cannot access this post')
        }
        return post
    }

    postVerification(post:PostEntity){
        if (!post){
            throw new BadRequestException('Cannot access this post')
        } 
    }

    postValidation(post:PostEntity){
        if(!post){
            throw new BadRequestException('Post does not exist')
        }
    }

}