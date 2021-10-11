import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/auth/entity/user.entity';
import { UserRepository } from 'src/auth/repository/user.repository';
import { FriendsRepository } from './repository/friends.repository';

@Injectable()
export class FriendsService {
    constructor(private readonly friendsRepository: FriendsRepository,
                private readonly userRepository: UserRepository){}

    async addFriend(userId: string, user: string){
        const [friend] = await this.userRepository.find({id:userId})
        const [friend1] = await this.friendsRepository.find({friend_user_id:userId})

        if(!friend){
            throw new BadRequestException('user doesn\'t exist')
        }

        if(friend1){
            throw new BadRequestException('You are already friends')
        }

        if(userId==user){
            throw new BadRequestException('You cannot add yourself')
        }

        return this.friendsRepository.save({friend_user_id:userId, user})
    }

    async deleteFriend(userId: string, user: string){
        const [friend] = await this.friendsRepository.find({friend_user_id:userId, user})

        if(!friend){
            throw new BadRequestException('deletion request cannot be processed')
        }

        return this.friendsRepository.delete({friend_user_id:userId, user})
    }

    async listFriends(user:string){
        const list = await this.friendsRepository.find({user})
        let x = []

        for(let i=0; list.length>i; i++){
            const [friend] = await this.userRepository.find({id:list[i].friend_user_id})

            const {id,first_name, last_name, username, email} = friend

            x.push({id,first_name, last_name, username, email})
        }
        return x
    }
}
