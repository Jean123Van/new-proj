import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { isUUID, IsUUID } from 'class-validator';
import { UserRepository } from 'src/auth/repository/user.repository';
import { Like } from 'typeorm';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository:UserRepository){}

    async getOne(userId:string){
        this.userRepository.validateUUID(userId)
        const [user] = await this.userRepository.find({id:userId})
        return this.userRepository.getOne(user)
    }

    async getList(filter: FilterDto){
        const {q, page=1, limit=10} = filter
        const paginate = {take: limit, skip: (page-1)*limit}
        const keyword = Like(`%${q}%`)

        const collection = await this.userRepository.find({where: [{first_name: keyword},
                                        {last_name: keyword},{username: keyword}]
                                        ,...paginate})

        return this.userRepository.getList(collection)
    }
}
