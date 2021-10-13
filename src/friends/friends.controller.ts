import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/auth/entity/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { FriendsService } from './friends.service';

@Controller('me')
@UseGuards(AuthGuard('jwt'))
export class FriendsController {
    constructor(private readonly friendsService: FriendsService){}

    @Post('/friends/:friend_user_id')
    addFriend(@Param('friend_user_id') friendUserId: string, @GetUser() user: UserEntity){
        return this.friendsService.addFriend(friendUserId, user.id)
    }

    @Delete('/friends/:friend_user_id')
    deleteFriend(@Param('friend_user_id') friendUserId: string, @GetUser() user: UserEntity){
        return this.friendsService.deleteFriend(friendUserId, user.id)
    }

    @Get('/friends')
    listFriends(@GetUser() user: UserEntity){
        return this.friendsService.listFriends(user.id)
    }
}
