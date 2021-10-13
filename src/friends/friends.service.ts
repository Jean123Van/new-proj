import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/auth/repository/user.repository';
import { FriendsRepository } from './repository/friends.repository';

@Injectable()
export class FriendsService {
    constructor(private readonly friendsRepository: FriendsRepository,
                private readonly userRepository: UserRepository){}

    async addFriend(friendUserId: string, userId: string){
        this.userRepository.validateUUID(friendUserId)
        const [user] = await this.userRepository.find({id:friendUserId})
        const [friend] = await this.friendsRepository.find({friend_user_id:friendUserId})

        this.userRepository.isUser(user)
        this.friendsRepository.isFriend(friend,friendUserId,userId)

        return this.friendsRepository.save({friend_user_id:friendUserId, user_id:userId})
    }

    async deleteFriend(friendUserId: string, userId: string){
        this.userRepository.validateUUID(friendUserId)
        const [friend] = await this.friendsRepository.find({friend_user_id:friendUserId, user_id:userId})

        this.friendsRepository.deleteValidation(friend)

        this.friendsRepository.delete({friend_user_id:friendUserId, user_id:userId})
    }

    async listFriends(user:string){
        const list = await this.friendsRepository.find({user_id:user})
  
        let friends = []

        for(let i=0; list.length>i; i++){
            const [friend] = await this.userRepository.find({id:list[i].friend_user_id})
            const {id,first_name, last_name, username, email} = friend
            friends.push({id,first_name, last_name, username, email})
        }
        return friends
    }
}
