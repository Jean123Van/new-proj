import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/auth/entity/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { CommentDto } from './dto/comment.dto';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';


@Controller('posts')
@UseGuards(AuthGuard('jwt'))
export class PostController {
    constructor(private readonly postService:PostService){}

    @Post()
    createPost(@Body() postDto:PostDto, @GetUser() user:UserEntity){
        return this.postService.createPost(postDto, user.id)
    }

    @Get('/:post_id')
    viewPost(@Param('post_id') id: string, @GetUser() user:UserEntity){
        return this.postService.viewPost(id, user.id)
    }

    @Delete('/:post_id')
    deletePost(@Param('post_id') id: string, @GetUser() user:UserEntity){
        return this.postService.deletePost(id, user.id)
    }

    @Post('/:post_id/comments')
    createComment(@Param('post_id') postId: string, @GetUser() user: UserEntity, @Body()commentDto: CommentDto){
        return this.postService.createComment(postId,user.id,commentDto)
    }

    @Get('/:post_id/comments/:comment_id')
    viewComment(@Param('post_id') postId: string, @GetUser() user: UserEntity, 
                @Param('comment_id')commentId: string){
        return this.postService.viewComment(postId, user.id, commentId)
    }

    @Delete('/:post_id/comments/:comment_id')
    deleteComment(@Param('post_id') postId: string, @GetUser() user: UserEntity, 
                @Param('comment_id')commentId: string){
        return this.postService.deleteComment(postId, user.id, commentId)
    }
}
