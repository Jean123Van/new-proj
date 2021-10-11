import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/auth/entity/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { FriendsService } from './friends.service';

@Controller('me')
@UseGuards(AuthGuard('jwt'))
export class FriendsController {
    constructor(private readonly friendsService: FriendsService){}

    @Post('/friends/:user_id')
    addFriend(@Param('user_id') userId: string, @GetUser() user: UserEntity){
        return this.friendsService.addFriend(userId, user.id)
    }

    @Delete('/friends/:user_id')
    deleteFriend(@Param('user_id') userId: string, @GetUser() user: UserEntity){
        return this.friendsService.deleteFriend(userId, user.id)
    }

    @Get('/friends')
    listFriends(@GetUser() user: UserEntity){
        return this.friendsService.listFriends(user.id)
    }
}
