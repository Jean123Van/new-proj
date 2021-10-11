import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendsRepository } from 'src/friends/repository/friends.repository';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CommentRepository } from './repository/comment.repository';
import { PostRepository } from './repository/post.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository]),
            TypeOrmModule.forFeature([FriendsRepository]),
            TypeOrmModule.forFeature([CommentRepository])],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
