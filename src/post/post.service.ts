import { BadRequestException, Injectable } from '@nestjs/common';
import { FriendsRepository } from 'src/friends/repository/friends.repository';
import { CommentDto } from './dto/comment.dto';
import { PostDto } from './dto/post.dto';
import { CommentRepository } from './repository/comment.repository';
import { PostRepository } from './repository/post.repository';

@Injectable()
export class PostService {
    constructor(private readonly postRepository: PostRepository,
                private readonly friendRepository: FriendsRepository,
                private readonly commentRepository: CommentRepository){}

    createPost(postDto:PostDto, user: string){
        return this.postRepository.save({...postDto,user})
    }

    async viewPost(id:string, user:string){

       const [post] = await this.postRepository.find({id:id})
       const [friend] = await this.friendRepository.find({user:user, friend_user_id:post.user})
        const [personal] = await this.postRepository.find({id:id, user:user})

        if (friend||personal){
            const {title, description} = post
            return {title, description}
        } else {
            throw new BadRequestException('Cannot access this post')
        }
    }

    async deletePost(id:string, user:string){

        const [personal] = await this.postRepository.find({id:id, user:user})

        if (personal){
            return this.postRepository.delete({id:id})
        } else {
            throw new BadRequestException('Cannot access this post')
        }
    }

    createComment(postId: string, userId: string, comment: CommentDto){
        return this.commentRepository.save({post_id:postId, user_id:userId, ...comment})
    }

    async viewComment(postId:string, user:string, commentId:string){

        const[comments] = await this.commentRepository.find({id:commentId})
        const [friend] = await this.friendRepository.find({user:user, friend_user_id:comments.user_id})
        const [personal] = await this.commentRepository.find({user_id:user, post_id:postId, id: commentId})

        if (friend||personal){
            const {comment} = comments
            return {comment}
        } else {
            throw new BadRequestException('Cannot access this comment')
        }
    }

    async deleteComment(postId:string, user:string, commentId:string){

        const [personal] = await this.commentRepository.find({user_id:user,post_id:postId,id:commentId})

        if (personal){
            return this.commentRepository.delete({id:commentId})
        } else {
            throw new BadRequestException('Cannot access this comment')
        }
    }

}
