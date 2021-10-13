import { BadRequestException } from "@nestjs/common";
import { isUUID } from "class-validator";
import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../entity/user.entity";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>{

    validateUUID(userId:string){
        if(!isUUID(userId)){
            throw new BadRequestException('user does not exist')
        }
    }

    getOne(user:UserEntity){
        if(!user){
            throw new BadRequestException('user does not exist')
        }

        const {id, username, first_name, last_name, email, created_at} = user
        return {id, username, first_name, last_name, email, created_at}
    }

    getList(collection:UserEntity[]){
        return collection.map(user=>{
            const {id, first_name, last_name, username, email} = user
            return {id, first_name, last_name, username, email}
        })
    }

    registrationValidation(user:UserEntity,email: string,username: string){
        if(user){
            if (user.username===username){
                throw new BadRequestException('username already exists')
            }
            if(user.email===email){
                throw new BadRequestException('email already exists')
            }
        }
    }

    userValidation(user:UserEntity){
        if(!user){
            throw new BadRequestException('Invalid username or password')
        }
    }

    passwordValidation(valid:boolean){
        if(!valid){
            throw new BadRequestException('Invalid username or password')
        }
    }

    isUser(user:UserEntity){
        if(!user){
            throw new BadRequestException('user doesn\'t exist')
        }
    }


}