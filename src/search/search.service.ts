import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/auth/repository/user.repository';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class SearchService {
    constructor(private readonly userRepository:UserRepository){}

    async search(id:string){
        const [user] = await this.userRepository.find({id})
        const {username, first_name, last_name, email} = user
        return {username, first_name, last_name, email}
    }

    async list(filter: FilterDto){
        const {q, page=1, limit=10} = filter
        const x = {take: limit, skip: (page-1)*limit}

        const collection = await this.userRepository.find({where: [{first_name: q},{last_name: q},{username: q}]
                                    ,...x})
        
        return collection.map(a=>{
            const {first_name, last_name, username, email} = a
            return {first_name, last_name, username, email}
        })
            
    }
}
