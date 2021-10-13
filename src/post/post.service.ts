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

    async getPost(post_id:string, userId:string){
        const [post] = await this.postRepository.find({id:post_id})
        const [friend] = await this.friendRepository.find({user_id:userId, friend_user_id:post.user})

        return this.postRepository.getPost(post,friend,userId)
    }

    async deletePost(id:string, user:string){
        const [post] = await this.postRepository.find({id:id, user:user})
        this.postRepository.postVerification(post)
        this.postRepository.delete({id:id})
    }

    async createComment(postId: string, userId: string, comment: CommentDto){
        const [post] = await this.postRepository.find({id:postId})
        this.postRepository.postValidation(post)
        const [friend] = await this.friendRepository.find({user_id:userId, friend_user_id:post.user})
        this.commentRepository.commentFilter(userId,post,friend)

        return this.commentRepository.save({post_id:postId, user_id:userId, ...comment})
    }

    async getAllComments(postId:string){
        return this.commentRepository.find({post_id:postId})
    }

    async getComment(postId:string, user:string, commentId:string){

        const[comments] = await this.commentRepository.find({id:commentId})
        this.commentRepository.commentValidation(comments,postId)
        const [friend] = await this.friendRepository.find({user_id:user, friend_user_id:comments.user_id})
        return this.commentRepository.getComment(friend, comments, user)
    }

    async deleteComment(postId:string, user:string, commentId:string){
        const [comment] = await this.commentRepository.find({user_id:user,post_id:postId,id:commentId})
        this.commentRepository.deleteComment(comment)
        this.commentRepository.delete({id:commentId})
    }

}
