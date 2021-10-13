import { BadRequestException } from "@nestjs/common";
import { UserEntity } from "src/auth/entity/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { FriendsEntity } from "../entity/friends.entity";

@EntityRepository(FriendsEntity)
export class FriendsRepository extends Repository<FriendsEntity>{

    isFriend(friend: FriendsEntity,friendUserId: string,userId: string){
        if(friend){
            throw new BadRequestException('You are already friends')
        }
        if(friendUserId==userId){
            throw new BadRequestException('You cannot add yourself')
        }
    }

    deleteValidation(friend:FriendsEntity){
        if(!friend){
            throw new BadRequestException('deletion request cannot be processed')
        }
    }

    

}